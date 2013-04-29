## Typeselect.js - Multi-select built on top of [twitter/typeahead.js](https://github.com/twitter/typeahead.js)

This is a light-weight wrapper to add multi-select functionality on top of twitter/typeahead.js.

### Requirements
1. requirejs
1. [twitter/typeahead.js](https://github.com/twitter/typeahead.js) - 0.9.3

### Usage

The api builds upon the [typeahead.js api](https://github.com/twitter/typeahead.js#api). It will help to read the documentation there first.

```javascript
   var t = $('.typselect-input').typeselect(datasets, options);
```

#### The options object

In addition to the dataset list, you can now pass an options object with the following attributes:

1. *target* - DOM object or selector to hold selected items

1. *selectedTemplate* - Template used to create elements placed in *target*. Maybe a compiled template object adhering to the [api](https://github.com/twitter/typeahead.js#template-engine-compatibility) or a string to be compiled with *engine*.  If objects are to be removable by the user, the template should include an element with class .close. Click on that element will remove the selected item.

1. *engine* - If *selectedTemplate* is a string, this must be the engine object used to compile. The object must adhere to the template engine [api](https://github.com/twitter/typeahead.js#template-engine-compatibility).


#### The datasets list or object

This is the same list of dataset objects or single dataset object passed to to the [typeahead](https://github.com/twitter/typeahead.js) constructor. Any of the options object attributes can be specified on a dataset object. In cases where the attribute is specified on a dataset object, it will take precedence. For example, if a different target is specified for a particular dataset, elements selected from that dataset will be placed in that particular target as opposed to the default target specified on the options object. In addition, the following attributes are available:

1. *selected* - List of datums to pre-selected items. 

#### Selected duplicate items

In the case of items fetched from remote sourced, typeselect will not allow multiple of the same item to be selected. Once the item is selected, it will no longer be shown as an option in the results. This is not something we can currently enforce with local and prefetch. This may change in the future.

### Obtaining selected items

```javascript
  // Return list of selected datums
  var selected = t('selected');
  // Return hash of selected items group of source dataset name
  selected = t.data('typeselect').selected(true);
```

### Remove an item

```javascript
  t.data('typeselect').remove(value:<string value>, dataset_name:<optional string name of source dataset>);
``` 












