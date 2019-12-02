$(function () {
  // let list = JSON.parse(localStorage.getItem('cars')) || [];
  let list = jsonData('cars') || [];


  if (list.length > 0) {
    $('.empty-tip').css('display', 'none');
    $('.cart-header').show();
    $('.total-of').show();
    //创建列表
    let html = "";
    list.forEach(e => {
      html += `<div class="item" data-id="${e.id}">
            <div class="row">
              <div class="cell col-1 row">
                <div class="cell col-1">
                  <input type="checkbox" class="item-ck" ${e.isChecked ? "checked" : ""}>
                </div>
                <div class="cell col-4">
                  <img src="${e.src}" alt="">
                </div>
              </div>
              <div class="cell col-4 row">
                <div class="item-name">${e.name}</div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="price">${e.price}</em>
              </div>
              <div class="cell col-1 tc lh70">
                <div class="item-count">
                  <a href="javascript:void(0);" class="reduce fl">-</a>
                  <input autocomplete="off" type="text" class="number fl" value="${e.sum}">
                  <a href="javascript:void(0);" class="add fl">+</a>
                </div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="computed">${e.price * e.sum}</em>
              </div>
              <div class="cell col-1">
                <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
              </div>
            </div>
          </div>`;
    })
    $('.item-list').html(html);







    //加号
    $('.item-list').on('click', '.add', function () {
      let sum = counter($(this).prev(), true);
      let id = $(this).parents('.item').attr('data-id');
      let taggle = list.find(e => {
        return e.id == id
      })
      taggle.sum = sum;
      $(this).parents('.item').find('.computed').text(taggle.sum * taggle.price);
      manth();
      jsonData('cars', list);

    })
    //减号
    $('.item-list').on('click', '.reduce', function () {
      if ($(this).next().val() <= 1) {
        layer.confirm('至少选一个！！！', { icon: 6, title: '提示' }, (index) => {
          layer.close(index);

        });
        return;
      }
      sum = counter($(this).next(), false);
      let id = $(this).parents('.item').attr('data-id');
      let taggle = list.find(e => {
        return e.id == id
      })
      taggle.sum = sum;
      $(this).parents('.item').find('.computed').text(taggle.sum * taggle.price);
      manth();
      jsonData('cars', list);
    })

    //获得焦点
    let sumOld;
    $('.item-list').on('focus', '.number', function () {
      sumOld = $(this).val();
    })
    //失去焦点

    $('.item-list').on('blur', '.number', function () {
      sat($(this),list,sumOld);
    })
    //回车提交
    $('.item-list').on('keydown', '.number', function (e) {
      if (e.keyCode == 13) {
        sat($(this),list,sumOld);
      }
    })
    //删除list
    $('.item-list').on('click', '.item-del', function () {
      layer.confirm('你确定要删除吗?', { icon: 0, title: '警告' }, (index) => {
        layer.close(index);
        let parents = $(this).parents('.item');
        parents.remove();
        let id = parents.attr('data-id');
        list.forEach((e, i) => {
          if (e.id == id) list.splice(i, 1);
        })
        manth();
        if (list.length == 0) {
          $('.empty-tip').css('display', '');
          $('.cart-header').hide();
          $('.total-of').hide();
        }
        jsonData('cars', list);
      });

    })

    //全选模式
    $('.pick-all').on('click', function () {
      let stauts = $(this).prop('checked');
      $('.item-ck').prop('checked', stauts);
      $('.pick-all').prop('checked', stauts);
      list.forEach(e => {
        e.isChecked = stauts;
      })
      manth();
      jsonData('cars', list);
    })



    //点选模式
    $('.item-ck').on('click', function () {
      let stauts = $('.item-ck:checked');
      //点选的主要语句
      $('.pick-all').prop('checked', stauts.length == $('.item-ck').length);
      let sum = $(this).prop('checked');
      let id = $(this).parents('.item').attr('data-id');
      list.find(e => {
        if (e.id == id) {
          e.isChecked = sum;
        }
      })
      manth();
      jsonData('cars', list);
    })
  }

  manth();
  function manth() {
    let sum = 0;
    let bigSum = 0
    list.forEach(e => {
      if (e.isChecked) {
        sum += e.sum;
        bigSum += e.sum * e.price;
      }
    })
    $('.selected').text(sum);
    $('.total-money').text(bigSum)
    $('.count').text(Some());
  }

})