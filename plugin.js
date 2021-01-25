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
            let form = document.getElementById(pluginNameForm);

            if (!form) {
                form = createFormEmpty(editor);
                createFields(editor, form);
                addFormInBody(form);
            } else {
                updateValueFieldWithHtml(editor);
            }

            submitForm(form);
        }
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
        let value = field.value || document.querySelector(selector).value || "";

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

    function updateValueFieldWithHtml(editor) {
        let selector = `#${pluginNameForm} > input[name='${editor.config.previewInServerNameFieldWithHtml}']`;
        let field = document.querySelector(selector);
        let value = editor.getData();

        field.setAttribute('value', value);
    }

    function addFormInBody(form) {
        document.getElementsByTagName('body')[0].appendChild(form);
    }

    function submitForm(form) {
        form.submit();
    }
})();