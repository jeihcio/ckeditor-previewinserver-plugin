(function() {

    var pluginName = 'previewinserver';

    CKEDITOR.plugins.add(pluginName, {
        lang: 'af,ar,az,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,es-mx,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn',
        icons: 'previewinserver',
        init: function(editor) {
            editor.addCommand(pluginName, {
                exec: function(editor) {
                    alert("teste");
                    var now = new Date();
                    editor.insertHtml('The current date and time is: <em>' + now.toString() + '</em>');
                }
            });

            editor.ui.addButton(pluginName, {
                label: editor.lang.previewinserver.title,
                command: pluginName,
                toolbar: 'document,41'
            });
        }
    });
})();