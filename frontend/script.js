const model = {
    urlSendMessage: "",

    getFormData: function(){
        const category = $('.js-category-select').val();
        const message = $('.js-message-input').val();

        return {
            category: category,
            message: message
        }
    },

    getSendMessagePromise: function(){
        return new Promise(function (resolve, reject) {
            var data = model.getFormData();

            $.ajax({
                type: 'POST',
                url: model.urlSendMessage,
                data: data,
                beforeSend: function () {
                    preloader.show({selector: '.feedback-card'});
                },
                success: function (response) {
                    resolve(response);
                },
                error: function () {
                    alert('დაფიქსირდა შეცდომა');
                    if(reject){
                        reject();
                    }
                },
                complete: function () {
                    preloader.hide();
                }
            });
        });    
    }
}

$(function(){
    $('.js-submit-btn').click(function(){
        preloader.show({selector: '.feedback-card'})
        setTimeout(function(){
            preloader.hide()
            $('.js-form').addClass('d-none');
            $('.js-success-container').fadeIn();
        }, 2000);
    });

    $('.js-repeat-btn').click(function(){
        $('.js-form').removeClass('d-none');
        $('.js-success-container').css('display', 'none');
    });
})