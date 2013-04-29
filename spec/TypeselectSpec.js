define(['jquery','typeselect'], function($){
   
    var inputTemplate = '<input id=source type=select autocomplete=false>';
    var targetTemplate = '<div id=target></div>';
    var $arena = $('#arena');

    function select($element, value){
        typeIn($element, value);
        downAndEnter($element);
    }

    function typeIn($element, value){
        var e;
        $element.val(value);
        // Tell the input something changed
        e = $.Event('input', { keyCode:65 });
        $element.trigger(e);
    }

    function downAndEnter($element){
        var e;
        // Down arrow 
        e = $.Event('keydown', { keyCode:40 });
        $element.trigger(e);
        // Enter
        e = $.Event('keydown', { keyCode:13 });
        $element.trigger(e);
    }

    describe('Typeselect typeahead wrapper', function(){
         var t;
         beforeEach(function(){
             $arena.append($(inputTemplate));
         });

         afterEach(function(){
             t.typeselect('destroy');
             $arena.empty();
         });

         it('attaches to text inputs', function(){
             t = $('#source').typeselect({
                 name: 'test',
                 local: ['apple', 'orange', 'banana']
             });
             expect($('#source')).toHaveClass('tt-query');
         });
    });

    describe('Typeselect local source', function(){
         var t;
         beforeEach(function(){
             $arena.append($(inputTemplate));
             $arena.append($(targetTemplate));
         });

         afterEach(function(){
             t.typeselect('destroy');
             $arena.empty();
         });

         it('adds selections to the target', function(){
             t = $('#source').typeselect({
                 name: 'test',
                 local: ['apple', 'orange', 'banana'],
                 target: '#target'
             });

             select($('#source'), 'apple');

             expect($('#target li')).toExist();
         });

         it('Adds preselected choices to the target', function(){
            t = $('#source').typeselect({
                 name: 'test',
                 local: ['apple', 'orange', 'banana'],
                 target: '#target',
                 selected: {value: 'orange'}
             });
             expect($('#target li')).toExist();
             // Last char is X we insert, so remove it before comparison
             expect($('#target li').text().replace(/\W/g, '')).toEqual('orange');
         });

         it('Removes selected items when close is clicked', function(){
             t = $('#source').typeselect({
                 name: 'test',
                 local: ['apple', 'orange', 'banana'],
                 target: '#target',
                 selected: {value: 'orange'}
             });

             expect($('#target li')).toExist();
             $('#target li span.close').click();
             expect($('#target li').length).toEqual(0);

         });

    });

    describe('Type select remote source', function(){
         var t;
         var async = new AsyncSpec(this);

         async.beforeEach(function(done){
             $arena.append($(inputTemplate));
             $arena.append($(targetTemplate));
             done();
         });

         async.afterEach(function(done){
            // There is a bug in the actual typeahead code if we use
            // destroy. Destroy does not prevent ajax callbacks from executing
            // and the callback contains code references that no longer exist
            // after destroy is called
            // t.typeselect('destroy');
             $arena.empty();
             done();
         });

         async.it("Retrieves remote datasets", function(done){
             t = $('#source').typeselect({
                 // Note, there seems to be an issue where if you reuse a dataset name, even on a 
                 // totally new input, if the old dataset was local, and the new one is remote,
                 // typeahead will not try to retrieve remote results
                 name: 'test_remote',
                 remote: '/mock/search.json?b=%QUERY',
                 target: '#target',
                 valueKey: 'label',
                 cache: false
             });

             typeIn(t, 'Hem');
             setTimeout(function(){
                 expect($('#source').parent().find('div.tt-suggestion').length).toEqual(4);
                 downAndEnter(t);
                 expect($('#target li').text().replace(/\W/g, '')).toEqual('HemoglobinHGBs');
                 done();
             }, 1500);
         });


         async.it("Filters out selected items from remote datasets", function(done){
             t = $('#source').typeselect({
                 // Note, there seems to be an issue where if you reuse a dataset name, even on a 
                 // totally new input, if the old dataset was local, and the new one is remote,
                 // typeahead will not try to retrieve remote results
                 name: 'test_remote',
                 remote: '/mock/search.json?d=%QUERY',
                 target: '#target',
                 valueKey: 'label',
                 cache: false,
                 selected: {id: 50, label:'Medication'}
             });

             expect($('#target li')).toExist();
             // Last char is X we insert, so remove it before comparison
             expect($('#target li').text().replace(/\W/g, '')).toEqual('Medication');
             typeIn(t, 'Med');

             setTimeout(function(){
                 // Medication is selected so it should not be shown.
                 expect($('#source').parent().find('div.tt-suggestion').length).toEqual(3);
                 done();
             }, 1500);

         });
        
         async.it("Items are no longer filtered out once unselected", function(done){
             t = $('#source').typeselect({
                 // Note, there seems to be an issue where if you reuse a dataset name, even on a 
                 // totally new input, if the old dataset was local, and the new one is remote,
                 // typeahead will not try to retrieve remote results
                 name: 'test_remote',
                 remote: '/mock/search.json?q=%QUERY',
                 target: '#target',
                 valueKey: 'label',
                 cache: false,
                 selected: {id: 50, label: 'Medication'}
             });

             // Remove selected item
             $('#target li span.close').click();
             typeIn(t, 'Med');
             setTimeout(function(){
                 // Medication was removed so it should be shown in results
                 expect($('#source').parent().find('div.tt-suggestion').length).toEqual(4);
                 done();
             }, 1500);

         });
    });
}); 
