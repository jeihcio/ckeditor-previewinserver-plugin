(function() {
    'use strict';
    var pluginName = 'previewinserver';
    var pluginNameForm = 'serverPreviewInServerForm';

    CKEDITOR.plugins.add(pluginName, {
        lang: 'af,ar,az,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,es-mx,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn',
        icons: 'previewinserver',
        init: function(editor) {
            editor.addCommand(pluginName, {
                exec: CKEDITOR.plugins.previewinserver.openPreview
            });

            editor.ui.addButton(pluginName, {
                label: editor.lang.previewinserver.title,
                command: pluginName,
                toolbar: 'document,41'
            });
        }
    });

    CKEDITOR.plugins.previewinserver = {
        openPreview: function(editor) {
            removeFormIfExists(pluginNameForm);

            let form = createFormEmpty(editor);
            createFields(editor, form);
            addFormInBody(form);
            submitForm(form);
        }
    }

    function removeFormIfExists(name) {
        let element = document.getElementById(name);

        if (!!element)
            element.parentNode.removeChild(element);
    }

    function createFormEmpty(editor) {
        let form = document.createElement('Form');
        let method = editor.config.previewInServerMethod || 'Get';
        let url = editor.config.previewInServerUrl;

        form.setAttribute('method', method);
        form.setAttribute('action', url);
        form.setAttribute('name', pluginNameForm);
        form.setAttribute('id', pluginNameForm);
        form.setAttribute('target', '_blank');

        form.style.display = 'none';
        return form;
    }

    function createFields(editor, form) {
        let fields = editor.config.previewInServerFields;

        fields.forEach(function(field) {
            let input = createField(field);
            form.appendChild(input);
        });

        let input = createFieldWithValueTheCkeditor(editor);
        form.appendChild(input);
    }

    function createField(field) {
        let input = document.createElement('Input');
        let selector = field.selector;
        let value = "";

        if (!!field.value)
            value = field.value;

        let fieldSelected = document.querySelector(selector);

        if (!!fieldSelected && 'value' in fieldSelected)
            value = document.querySelector(selector).value;

        input.setAttribute('type', 'hidden');
        input.setAttribute('name', field.key);
        input.setAttribute('value', value);

        return input;
    }

    function createFieldWithValueTheCkeditor(editor) {
        let field = {
            key: editor.config.previewInServerNameFieldWithHtml,
            value: editor.getData()
        };

        return createField(field);
    }

    function addFormInBody(form) {
        document.getElementsByTagName('body')[0].appendChild(form);
    }

    function submitForm(form) {
        form.submit();
    }
})();