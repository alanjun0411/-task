function jsonData(key, arr) {
    // arr = arr || [];
    if (arr) {
        return localStorage.setItem(key, JSON.stringify(arr));
    } else {
        return JSON.parse(localStorage.getItem(key));
    }
}
// function ADDcounter(add, callback, styles) {
//     let num = $(add).val();
//     num++;
//     callback(num);
// }
// function reduceCounter(reduce, callback) {
//     let num = $(reduce).val();
//     num--;
//     callback(num);
//     return num;
// }
function counter(element, styles, callback) {
    let num = $(element).val();
    styles ? num++ : num--;
    $(element).val(num);
    if (callback) callback(num);
    return num;
}

function sat(element, list, sumOld) {
    let sum = parseFloat(element.val());
    if (sum < 1 || isNaN(sum) || sum == '') {
        alert('请输入有效值！！！');
        element.val(sumOld);
        return;
    }
    let id = element.parents('.item').attr('data-id');
    let taggle = list.find(e => {
        return e.id == id
    })
    taggle.sum = sum;
    element.parents('.item').find('.computed').text(taggle.sum * taggle.price);
    manth();
    jsonData('cars', list);
}

function Some(){
   return (JSON.parse(localStorage.getItem('cars')) || []).length;
}
