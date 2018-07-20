Ext.define('Nc.ux.widget.configSearchBar.DeviceSearchWidget',{
    extend:'Ext.Container',
    xtype: 'searchConfig-widget',
    controller: 'devicesearch-widget',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Nc.ux.widget.configSearchBar.DeviceSearchWidgetController'
    ],
    items: [
        {
            xtype: 'toolbar',
            cls:'__deviceSearchToolbar',
            padding: '16 32',
            margin: 0,
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                   // disabled: true,
                    reference: 'searchwordtoolbar',
                    items: [
                        {
                            xtype: 'textfield',
                            emptyText: 'Search key/value',
                            ui: 'light',
                            cls: 'extended-search-field',
                            name: 'searchField',
                            reference: 'searchwordbutton',
                            onChange: function (value) {
                                var codemirror = Ext.ComponentQuery.query('codemirror')[0].codeMirror;
                                var nthOccurenceArr = codemirror.histMarks;
                                var nthOccurence, occurencesString;
                                var jsonToSearch = codemirror.options.value;
                                var noOfOccurencesArr, query;
                                var textToBeSearched = this.getValue();
                                RegExp.escape = function(string) {
                                    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
                                };
                                if (textToBeSearched !== " " && textToBeSearched !== "") {
                                    query = new RegExp("(\\b" + RegExp.escape(textToBeSearched)+ "\\b)", "gim");
                                }
                                if (jsonToSearch.match(query) !== null && query !== undefined) {
                                    noOfOccurencesArr = jsonToSearch.match(query).length;
                                }
                                if (noOfOccurencesArr !== undefined) {
                                    for (var i = 0; i < nthOccurenceArr.length; i++) {
                                        if (nthOccurenceArr[i].className === "current-occurence-highlight-color") {
                                            nthOccurence = i + 1;
                                            break;
                                        }
                                    }
                                }
                                occurencesString = nthOccurence + '/' + noOfOccurencesArr;
                                var occurenceUpdate = this.lookupReferenceHolder().getReferences().occurencesField;
                                if (noOfOccurencesArr !== undefined && nthOccurence !== undefined && occurencesString !== undefined) {
                                    occurenceUpdate.setValue(occurencesString);
                                } else if (occurencesString === "undefined/undefined" && value.length !== 0) {
                                    occurenceUpdate.setValue('0/0');
                                } else {
                                    occurenceUpdate.setValue(' ');
                                }
                            }
                        },
                        {
                            xtype: 'displayfield',
                            ui: 'light',
                            reference: 'occurencesField',
                            cls: 'occurence-cls'
                        },
                        {
                            xtype: 'button',
                            ui: 'light',
                            tooltip: 'Next Occurence',
                            iconCls: 'nc-uif-arrow-down',
                            handler: function () {
                                var editor = Ext.ComponentQuery.query('codemirror')[0].codeMirror;
                                var arr = editor.histMarks;
                                if (arr !== undefined) {
                                    for (var i = 0; i < arr.length - 1; i++) {
                                        if (editor.histMarks[i].className === "current-occurence-highlight-color") {
                                            var j = i;
                                            editor.scrollIntoView(editor.indexes[++j]);
                                            editor.histMarks[i].className = 'highlight-color';
                                            editor.histMarks[++i].className = 'current-occurence-highlight-color';
                                            this.lookupReferenceHolder().getReferences().searchwordbutton.onChange();
                                            editor.refresh();
                                            break;
                                        }
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            ui: 'light',
                            iconCls: 'nc-uif-arrow-up',
                            tooltip: 'Previous Occurence',
                            text: '',
                            handler: function () {
                                var editor = Ext.ComponentQuery.query('codemirror')[0].codeMirror;
                                var arr = editor.histMarks;
                                if (arr !== undefined) {
                                    for (var i = 1; i < arr.length; i++) {
                                        if (editor.histMarks[i].className === "current-occurence-highlight-color") {
                                            var j = i;
                                            editor.scrollIntoView(editor.indexes[--j]);
                                            editor.histMarks[i].className = 'highlight-color';
                                            editor.histMarks[--i].className = 'current-occurence-highlight-color';
                                            this.lookupReferenceHolder().getReferences().searchwordbutton.onChange();
                                            editor.refresh();
                                            break;
                                        }
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            ui: 'light',
                            tooltip: 'Clear search',
                            iconCls: 'nc-uif-delete',
                            handler: function () {
                                this.lookupReferenceHolder().getReferences().searchwordbutton.reset();
                            }
                        }
                    ]
                }
            ]
        }
    ]

});