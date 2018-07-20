Ext.define('Nc.ux.widget.configSearchBar.DeviceSearchWidgetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.devicesearch-widget',

    listen: {
        component: {
            'textfield[reference=searchwordbutton]': {
                change: 'onSearchDeviceConfig'
            }
        }
    },
    onSearchDeviceConfig: function (value) {
        var me = this;
        var editor = Ext.ComponentQuery.query('codemirror')[0].codeMirror;
        var count = 0;

        if (Object.keys(editor).length !== 0) {
            var markerClassName = 'highlight-color';
            var currentClassName = 'current-occurence-highlight-color';
            var ret, histMarks = [], indexes = [];
            var first, from, to, query, cursor;
            if (editor.histMarks !== null && editor.histMarks !== undefined) {
                for (var i = 0; i < editor.histMarks.length; i++) {
                    editor.histMarks[i].clear();
                }
                editor.histMarks = [];
            }
            var textToBeSearched = value.getValue();
            if (textToBeSearched !== " " && textToBeSearched !== "") {
                RegExp.escape = function(string) {
                    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
                };
                query =new RegExp("(\\b" + RegExp.escape(textToBeSearched)+ "\\b)", "gim");
                //query = new RegExp("(\\b" + textToBeSearched + "\\b)", "gim");
                cursor = editor.getSearchCursor(query);

                while (cursor.findNext()) {
                    count++;
                    from = cursor.from();
                    to = cursor.to();
                    indexes.push(from);
                    if (count === 1) {
                        ret = editor.markText(from, to, {
                            className: currentClassName
                        });
                    } else {
                        ret = editor.markText(from, to, {
                            className: markerClassName
                        });
                    }

                    histMarks.push(ret);
                    editor.histMarks = histMarks;
                    if (first === undefined) {
                        first = from;
                    }
                }

                editor.indexes = indexes;
                if (first) {
                    editor.scrollIntoView(first);
                }
            }
        }
    },


    refresh: function () {
        var versionsList = this.lookup('versionsList');
        versionsList && versionsList.refresh();
    }

});
