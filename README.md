fidos
=====

Form Description Objects are JSON objects that describe a form's structure, validation, presentation and posting rules. This document describes only the JSON format for fidos and does not address the renderer, validator or posting acceptor.

    {
        "myKey": "addToDoItem",
        "title": "Create a new to do item",
        "instructions": "Fill out this form, playing close attention to the required fields to add a new item to your to do list",
        "class": "simple wide",
        "fields": {
            "[fieldName]": {
                "rules": { required: true, maxlength: 100 },
                "type": "text",
                "label": "Item Name",
                "tooltip": "Enter a descriptive name for the to do item",
                "value": "someValue"
            }
        },
        "init": function() { console.log('initializing the form'); },
        "submitHandler": function() { console.log('The user submitted the form'),
        "onValid": function() { console.log('Validation passed'),
    }

**myKey** - A unique name for the form/fido.

**title** - A title to be displayed at the top of the form (not field specific)

**instuctions** - Instructions to be displayed at the top of the form (not field specific)

**class** - A class or classes that will be appied to the form element

**fields** - An object containing field objects for the form

  **fieldName** - A unique name for the field that should be used on the form element's name and id properties
  
  **rules** - Validation rules that match the rules defined in [jQuery validate](http://docs.jquery.com/Plugins/Validation/Methods/maxlength#length), our preferred for validator
  
  **message** - Message that matches the object defined in [jQuery validate](http://docs.jquery.com/Plugins/Validation/Methods/maxlength#length), our preferred for validator
  
  **type** - A form field type (text|hidden|div|select|checkbox|*custom*). You may create your own custom type, just be sure to handle it preoperly in your presentation validation and posting
  
  **label** - The name to be used in the form element label
  
  **tooltip** - Text to be displayed when rolling over a help icon
  
  **value** - The default value for the field
  
**init** - A function that is called after your form is inserted into the DOM

jQuery Validate
---------------

jQuery Validate defines all messages in one object and all rules in another object. Here the individual rules and message are associated with the field object. Your client side code should build the rules and messages object for jQuery Validate using these pieces. Check out the fidoHandler.js example for an example of how this can be done.

All the [jQuery Validate options](http://docs.jquery.com/Plugins/Validation/validate#options) are valid options on the fido.

Customizing
-----------

You can of course sprinkle in your own properties and functions and use them in your presentation or posting acceptor code.



  
