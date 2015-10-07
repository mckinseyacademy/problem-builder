function ReviewStepEdit(runtime, element) {
    "use strict";

    var $buttons = $('.add-xblock-component-button[data-category=pb-message]', element);

    var blockIsPresent = function(klass) {
        return $('.xblock ' + klass).length > 0;
    };

    var updateButton = function(button, condition) {
        button.toggleClass('disabled', condition);
    };

    var disableButton = function(ev) {
        if ($(this).is('.disabled')) {
            ev.preventDefault();
            ev.stopPropagation();
        } else {
            $(this).addClass('disabled');
        }
    };

    var updateButtons = function(buttons) {
        buttons.each(function() {
            var button = $(this);
            var msgType = button.data('boilerplate');
            updateButton(button, blockIsPresent('.submission-message.'+msgType));
        });
    };

    var initButtons = function() {
        updateButtons($buttons);
        $buttons.on('click', disableButton);
    };

    var resetButtons = function() {
        var $disabledButtons = $buttons.filter('.disabled');
        updateButtons($disabledButtons);
    };

    ProblemBuilderUtil.transformClarifications(element);

    initButtons();
    runtime.listenTo('deleted-child', resetButtons);

}
