(function() {
    'use strict';
    var pluginName = 'previewinserver';

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
            let form = createFormEmpty(editor);

            addFormInBody(form);
            submitForm(form);
        }
    }

    function createFormEmpty(editor) {
        let form = document.createElement('Form');
        let method = editor.config.previewInServerMethod || 'Get';
        let url = editor.config.previewInServerUrl;

        form.setAttribute('method', method);
        form.setAttribute('action', url);
        form.setAttribute('name', 'serverPreviewInServerForm');
        form.setAttribute('id', 'serverPreviewInServerForm');
        form.setAttribute('target', '_blank');
        form.style.display = 'none';
        return form;
    }

    function addFormInBody(form) {
        document.getElementsByTagName('body')[0].appendChild(form);
    }

    function submitForm(form) {
        form.submit();
    }
})();