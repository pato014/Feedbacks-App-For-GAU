
const model = {
    urlSendMessage: "/api/messages/",
    urlGetCategories: "/api/categories/",

    loadCategories: function() {
        return new Promise(function(resolve, reject) {
            $.ajax({
                type: 'GET',
                url: model.urlGetCategories,
                success: function(response) {
                    const $select = $('.js-category-select');
                    $select.empty();
                    $select.append('<option value="">აირჩიეთ კატეგორია</option>');

                    response.forEach(function(category) {
                        $select.append(`<option value="${category.id}">${category.name}</option>`);
                    });

                    resolve(response);
                },
                error: function(xhr, status, error) {
                    console.error('Error loading categories:', error);
                    alert('კატეგორიების ჩატვირთვა ვერ მოხერხდა');
                    reject(error);
                }
            });
        });
    },

    getFormData: function(){
        const category = $('.js-category-select').val();
        const message = $('.js-message-input').val();

        return {
            category: parseInt(category),  // Ensure it's an integer
            text: message
        }
    },

    validateForm: function() {
        const category = $('.js-category-select').val();
        const message = $('.js-message-input').val();

        if (!category || category === '') {
            alert('გთხოვთ აირჩიოთ კატეგორია');
            return false;
        }

        if (!message || message.trim() === '') {
            alert('გთხოვთ შეიყვანოთ შეტყობინება');
            return false;
        }

        return true;
    },

    getSendMessagePromise: function(){
        return new Promise(function (resolve, reject) {
            var data = model.getFormData();

            $.ajax({
                type: 'POST',
                url: model.urlSendMessage,
                data: JSON.stringify(data),
                contentType: 'application/json',
                headers: {
                    'X-CSRFToken': model.getCookie('csrftoken')
                },
                beforeSend: function () {
                    if (typeof preloader !== 'undefined') {
                        preloader.show({selector: '.feedback-card'});
                    }
                },
                success: function (response) {
                    console.log('Message sent successfully:', response);
                    resolve(response);
                },
                error: function (xhr, status, error) {
                    console.error('Error sending message:', xhr.responseText);
                    alert('დაფიქსირდა შეცდომა: ' + (xhr.responseJSON?.error || error));
                    reject(error);
                },
                complete: function () {
                    if (typeof preloader !== 'undefined') {
                        preloader.hide();
                    }
                }
            });
        });
    },

    getCookie: function(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}

$(function(){
    // Load categories on page load
    model.loadCategories().catch(function(error) {
        console.error('Failed to load categories:', error);
    });

    $('.js-submit-btn').click(function(e){
        e.preventDefault(); // Prevent default button behavior

        // Validate form
        if (!model.validateForm()) {
            return;
        }

        // Send message to backend
        model.getSendMessagePromise().then(function(response) {
            console.log('Success! Message saved:', response);
            $('.js-form').addClass('d-none');
            $('.js-success-container').fadeIn();
        }).catch(function(error) {
            console.error('Failed to send message:', error);
        });
    });

    $('.js-repeat-btn').click(function(e){
        e.preventDefault(); // Prevent default button behavior
        $('.js-form').removeClass('d-none');
        $('.js-success-container').css('display', 'none');

        // Clear form fields
        $('.js-message-input').val('');
        $('.js-category-select').val('');
    });
})