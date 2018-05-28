$.ajax({
  url: "./json/shop.json",
  type: "post",
  success: function (result) {
    console.log("请求成功");
    var productList = [];
    for (var i = 0; i < result.length; i++) {
      productList.push(result[i])
    }
    re(productList);
  },
  error: function () {
    console.log("失败");
  }
})
//重新渲染
function re(productList) {
  var str = "";
  for (var i = 0; i < productList.length; i++) {
    str +=
      `
      <tr>
        <td class="td-check">
          <span class="check-span check-single"></span>
        </td>
        <td class="td-product">
          <img width="98" height="98" src="` + productList[i].pro_img + `">
          <div class="product-info">
            <h6>` + productList[i].pro_name + `</h6>
            <p>品牌：<span class="pro_brand">` + productList[i].pro_brand + `</span></p>
            <p>产地：<span class="pro_place">` + productList[i].pro_place + `</span></p>
            <p>规格/纯度: <span class="pro_purity">` + productList[i].pro_purity + `</span></p>
            <p>起定量：<span class="pro_min">` + productList[i].pro_min + `</span></p>
            <p>配送仓储：<span class="pro_depot">` + productList[i].pro_depot + `</span></p>
          </div>
          <div class="clearfix"></div>
        </td>
        <td class="td-num">
          <div class="product-num">
            <a href="javascript:;" class="num-reduce num-do fl">
              <span></span>
            </a>
            <input type="text" class="num-input" value=` + productList[i].pro_num + `>
            <a href="javascript:;" class="num-add num-do fr">
              <span></span>
            </a>
          </div>
        </td>
        <td class="td-price">
          <p class="red-text">￥
            <span class="price-text">` + productList[i].pro_price + `</span>
          </p>
        </td>
        <td class="td-total">
          <p class="red-text">￥
            <span class="total-text">` + productList[i].pro_num * productList[i].pro_price + `</span>.00</p>
        </td>
        <td class="td-do">
          <a href="javascript:;" class="product-delect">删除</a>
        </td>
      </tr>
    `
  }
  $("tbody").html(str)
  check(productList);
  delecta(productList);
  judge(productList);
  total(productList);

}
//总数
function total(productList) {
  var totalprice = 0;
  var totalnumber = 0;
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].select == true) {
      totalprice += productList[i].pro_num * productList[i].pro_price;
      totalnumber += 1;
    }
  }
  $(".cart-product-info .product-total span").text(totalprice);
  $(".cart-product-info .check-num span").text(totalnumber);

}
//删除一行
function delects(productList) {
  $(".product-delect").click(function(){})
}
//删除选中
function delecta(productList) {
  var undelList=[];
  $(".delect-product").click(function(){
    for(var i=0;i<productList.length;i++){
      if(productList[i].select==false){
        undelList.push(productList[i])
      }
    }
    re(undelList)
    
  })
}
//改变状态
function check(productList) {
  //单独点击复选框
  $(".check-single").click(function () {
    //获取这个复选框的index
    var index = $(this).parent().parent().index();
    //如果当前这个复选框是选中状态，点击之后变成未选中状态
    //同时将列表中select属性改变
    if ($(this).hasClass("check-true")) {
      $(this).removeClass("check-true")
      productList[index].select = false
    } else {
      $(this).addClass("check-true")
      productList[index].select = true
    }
    re(productList)
  })
  //全选按钮
  $(".check-all").click(function () {
    if ($(this).hasClass("check-true")) {
      $(this).removeClass("check-true");
      for (var i = 0; i < $("tbody tr").length; i++) {
        $("tbody").children("tr").eq(i).find(".check-single").removeClass("check-true")
        productList[i].select = false
      }
    } else {
      $(this).addClass("check-true");
      for (var i = 0; i < $("tbody tr").length; i++) {
        $("tbody").children("tr").eq(i).find(".check-single").addClass("check-true")
        productList[i].select = true
      }
    }
    re(productList)
  })
}
function judge(productList){
  var num = 0;
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].select == true) {
      num += 1;
      $("tbody").children("tr").eq(i).find(".check-single").addClass("check-true")
    } else if (productList[i].select == false) {
      $("tbody").children("tr").eq(i).find(".check-single").removeClass("check-true")
    }
  }
  if (num == productList.length) {
    $(".check-all").addClass("check-true")
  } else if (num < productList.length) {
    $(".check-all").removeClass("check-true")
  }
}