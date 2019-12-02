$(function () {
    let id = location.search.substring(4);
    let data = phoneData.find(e => {
        return e.pID == id;
    })
    $('.choose-number').val(1);
    $('.preview-img img').attr('src', data.imgSrc);
    $('.sku-name').text(data.name);
    $('.summary-price em').text(`¥${data.price}`);


    $('.add').on('click', () => {
        let num =counter('.choose-number', true)
        if (num == 2) $('.reduce').removeClass('disabled');
    })
    $('.reduce').on('click', () => {
        let num = $('.choose-number').val();
        if (num > 1) {
            num = counter('.choose-number', false)
        }
        if (num == 1) $('.reduce').addClass('disabled');
    })
    //输入框监控
    $('.choose-number').on('input',function(){
        if($(this).val()>1){
            $('.reduce').removeClass('disabled');
        }else{
            $('.reduce').addClass('disabled');
        }

    })



    let list = jsonData('cars') || [];
    $('.count').text(Some());
    $('.addshopcar').on('click', () => {
        let number = $('.choose-number').val();
        if (isNaN(number) || number.trim().length == 0 || number <= 0) {
            alert('数量输入不正确！！！');
        } else {
            let newP = list.find(e => {
                return e.id == id;
            })
            number = parseInt(number);
            if (newP) {
                newP.sum += number;

            } else {
                let obj = {
                    id: data.pID,
                    sum: number,
                    name: data.name,
                    price: data.price,
                    src: data.imgSrc,
                    isChecked: true
                }
                list.push(obj);
            }
            jsonData('cars', list);
            location.href = './cart.html';
        }
        
        
        
       
    })
})
