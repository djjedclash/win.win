$(document).ready(function() {

  var twins_price_bid;
  var old_twins_price_bid;

  var twins_price_ask;
  var old_twins_price_ask;

  var btc_price;

  var active_wallets_count;
  var old_active_wallets_count;

  var dev_wallet_balance;
  var old_dev_wallet_balance;

  var money_supply;
  var old_money_supply;

  var twins_locked;
  var old_twins_locked;

  var node_worth;
  var old_node_worth;

  var market_cap;
  var old_market_cap;

  var blockTimeCoin;

  function getExplorerData() {
    $.ajax({
      url: 'https://explorer.win.win/ext/getstats',
      success: function(data) {
        active_wallets_count = data.active_wallets_count;
        var total_wallets = data.total_wallets_count;
        $('#active_wallets .data_coin').html(active_wallets_count + " / " + total_wallets);

        dev_wallet_balance = (data.dev_wallet_balance / 1000000).toFixed(3);
        $('#dev_fund .data_coin').html(dev_wallet_balance + "M");

        money_supply = (data.money_supply / 1000000).toFixed(3);
        $('#coin_supply .data_coin').html(money_supply + "M");

        twins_locked = data.masternode_count;
        $('#coin_locked .data_coin').html(twins_locked + "M" + " (" + (twins_locked / money_supply * 100).toFixed(2) + "%)");


        node_worth = 1000000 * btc_price;
        $('#node_worth .data_coin').html("$" + node_worth.toFixed(2));

        market_cap = (money_supply * btc_price).toFixed(3);
        $('#market_cap .data_coin').html("$" + market_cap + "M");

        blockTimeCoin = data.average_sec_per_block;
        $('#block_time .data_coin').html(blockTimeCoin.toFixed(2) + " Sec");


        // market_cap indication
        if (!old_market_cap) {
          old_market_cap = market_cap;
        } else {
          if (market_cap > old_market_cap) {
            old_market_cap = market_cap;
            $('#market_cap').addClass('block_plus');
            setTimeout(function() {
              $('#market_cap').removeClass('block_plus');
            }, 2000);
          } else if (market_cap < old_market_cap) {
            old_market_cap = market_cap;
            $('#market_cap').addClass('block_minus');
            setTimeout(function() {
              $('#market_cap').removeClass('block_minus');
            }, 2000);
          }
        }

        // node_worth indication
        if (!old_node_worth) {
          old_node_worth = node_worth;
        } else {
          if (node_worth > old_node_worth) {
            old_node_worth = node_worth;
            $('#node_worth').addClass('block_plus');
            setTimeout(function() {
              $('#node_worth').removeClass('block_plus');
            }, 2000);
          } else if (node_worth < old_node_worth) {
            old_node_worth = node_worth;
            $('#node_worth').addClass('block_minus');
            setTimeout(function() {
              $('#node_worth').removeClass('block_minus');
            }, 2000);
          }
        }

        // twins_locked indication
        if (!old_twins_locked) {
          old_twins_locked = twins_locked;
        } else {
          if (twins_locked > old_twins_locked) {
            old_twins_locked = twins_locked;
            $('#coin_locked').addClass('block_plus');
            setTimeout(function() {
              $('#coin_locked').removeClass('block_plus');
            }, 2000);
          } else if (twins_locked < old_twins_locked) {
            old_twins_locked = twins_locked;
            $('#coin_locked').addClass('block_minus');
            setTimeout(function() {
              $('#coin_locked').removeClass('block_minus');
            }, 2000);
          }
        }

        // dev_wallet_balance indication
        if (!old_dev_wallet_balance) {
          old_dev_wallet_balance = dev_wallet_balance;
        } else {
          if (dev_wallet_balance > old_dev_wallet_balance) {
            old_dev_wallet_balance = dev_wallet_balance;
            $('#dev_fund').addClass('block_plus');
            setTimeout(function() {
              $('#dev_fund').removeClass('block_plus');
            }, 2000);
          } else if (dev_wallet_balance < old_dev_wallet_balance) {
            old_dev_wallet_balance = dev_wallet_balance;
            $('#dev_fund').addClass('block_minus');
            setTimeout(function() {
              $('#dev_fund').removeClass('block_minus');
            }, 2000);
          }
        }

        // active_wallets_count indication
        if (!old_active_wallets_count) {
          old_active_wallets_count = active_wallets_count;
        } else {
          if (active_wallets_count > old_active_wallets_count) {
            old_active_wallets_count = active_wallets_count;
            $('#active_wallets').addClass('block_plus');
            setTimeout(function() {
              $('#active_wallets').removeClass('block_plus');
            }, 2000);
          } else if (active_wallets_count < old_active_wallets_count) {
            old_active_wallets_count = active_wallets_count;
            $('#active_wallets').addClass('block_minus');
            setTimeout(function() {
              $('#active_wallets').removeClass('block_minus');
            }, 2000);
          }
        }

        // money_supply indication
        if (!old_money_supply) {
          old_money_supply = money_supply;
        } else {
          if (money_supply > old_money_supply) {
            old_money_supply = money_supply;
            $('#coin_supply').addClass('block_plus');
            setTimeout(function() {
              $('#coin_supply').removeClass('block_plus');
            }, 2000);
          } else if (money_supply < old_money_supply) {
            old_money_supply = money_supply;
            $('#coin_supply').addClass('block_minus');
            setTimeout(function() {
              $('#coin_supply').removeClass('block_minus');
            }, 2000);
          }
        }

      },
      complete: function() {
        setTimeout(getExplorerData, 10000);
      }
    });
  }
  function getExchangeData() {
    $.ajax({
      url: 'https://explorer.win.win/ext/getMarketLatestData/bitsane',
      success: function(data) {

        btc_price = Number(data.price_usd);

        twins_price_bid = Number(data.lowestAsk);

        $('#twins_ask .btc_price').html(twins_price_bid.toFixed(8) + " BTC");
        $('#twins_bid .usd_price').html("$" + btc_price.toFixed(6));

        twins_price_ask = Number(data.highestBid);
        $('#twins_bid .btc_price').html(twins_price_ask.toFixed(8) + " BTC");
        $('#twins_ask .usd_price').html("$" + (btc_price * twins_price_bid / twins_price_ask).toFixed(6));


        // twins_price_ask indication
        if (!old_twins_price_ask) {
          old_twins_price_ask = twins_price_ask;
        } else {
          if (twins_price_ask > old_twins_price_ask) {
            old_twins_price_ask = twins_price_ask;
            $('#twins_bid').addClass('block_plus');
            setTimeout(function() {
              $('#twins_bid').removeClass('block_plus');
            }, 2000);
          } else if (twins_price_ask < old_twins_price_ask) {
            old_twins_price_ask = twins_price_ask;
            $('#twins_bid').addClass('block_minus');
            setTimeout(function() {
              $('#twins_bid').removeClass('block_minus');
            }, 2000);
          }
        }


        // twins_price_bid indication
        if (!old_twins_price_bid) {
          old_twins_price_bid = twins_price_bid;
        } else {
          if (twins_price_bid > old_twins_price_bid) {
            old_twins_price_bid = twins_price_bid;
            $('#twins_ask').addClass('block_plus');
            setTimeout(function() {
              $('#twins_ask').removeClass('block_plus');
            }, 2000);
          } else if (twins_price_bid < old_twins_price_bid) {
            old_twins_price_bid = twins_price_bid;
            $('#twins_ask').addClass('block_minus');
            setTimeout(function() {
              $('#twins_ask').removeClass('block_minus');
            }, 2000);
          }
        }

      },
      complete: function() {
        setTimeout(getExchangeData, 10000);
      }
    });
  }
  getExplorerData();
  getExchangeData();

  // ---------------------------------------------------------------------------
  // set variables
  var viewPortWidth;
  var viewPortHeight;
  var viewPort = $(window);
  var mainBlock = $('.main_header');
  var menu = $('.main_menu');

  // change block size function
  function blockResize() {
    viewPortWidth = viewPort.width();
    viewPortHeight = viewPort.height();
    mainBlock.width(viewPortWidth).height(viewPortHeight - 56);
  }

  // run runction after load page
  blockResize();

  // run function after window resize
  $(window).resize(function() {
    blockResize();
  });

  // fix menu on top after scroll
  $(window).scroll(function() {
    var scrollPosition = $(document).scrollTop();
    if (scrollPosition >= (viewPortHeight - 56)) {
      menu.addClass('fixed')
    } else {
      menu.removeClass('fixed')
    }
  });
  // ---------------------------------------------------------------------------

  $('.close_buttom').on('click', function() {
    $('.mobile_menu_items').slideUp();
  });

  $('.mobile_button').on('click', function() {
    $('.mobile_menu_items').slideDown();
  });

  $('.mobile_menu_items li a').on('click', function() {
    if ($(this).closest('.menu-dropdown').length === 0) {
      $('.mobile_menu_items').slideUp();
    }
  });

  // get periodic statistics
  (function worker() {
    $.ajax({
      url: 'https://explorer.win.win/ext/getstats',
      success: function(data) {
        $('#total_wallets_count').html(data.total_wallets_count);
        $('#active_wallets_count').html(data.active_wallets_count);
        $('#money_supply').html(numberWithSpaces(data.money_supply.toFixed()));
        $('#masternode_count').html(data.masternode_count);
        $('#block_count').html(data.block_count);
        $('#dev_wallet_balance').html(numberWithSpaces(data.dev_wallet_balance.toFixed()));
        $('#twins_locked').html(data.twins_locked);
        $('#current_block_time').html(data.average_sec_per_block.toFixed(2));
      },
      complete: function() {
        // Schedule the next request when the current one's complete
        setTimeout(worker, 60000);
      }
    });
  })();

  (function($) {
    $.fn.extend({
      rotaterator: function(options) {

        var defaults = {
          fadeSpeed: 2000,
          pauseSpeed: 5000,
          child: null
        };

        var options = $.extend(defaults, options);

        return this.each(function() {
          var o = options;
          var obj = $(this);
          var items = $(obj.children(), obj);
          items.each(function() {
            $(this).hide();
          })
          if (!o.child) {
            var next = $(obj).children(':first');
          } else {
            var next = o.child;
          }
          $(next).fadeIn(o.fadeSpeed, function() {
            $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
              var next = $(this).next();
              if (next.length == 0) {
                next = $(obj).children(':first');
              }
              $(obj).rotaterator({
                child: next,
                fadeSpeed: o.fadeSpeed,
                pauseSpeed: o.pauseSpeed
              });
            })
          });
        });
      }
    });
  })(jQuery);

  $(document).ready(function() {
    $('#rotate').rotaterator({
      fadeSpeed: 0,
      pauseSpeed: 3000
    });
    setInterval(function() {
      $('.info_coin_text').css('opacity', '0');
      $('.coin_info').addClass('counter_block_active');
      setTimeout(function() {
        $('.info_coin_text').css('opacity', '1');
        $('.coin_info').removeClass('counter_block_active');
      }, 300);
    }, 3000)
  });

});

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// dropdown
$(document).ready(function() {
  var wallet = $('.wallet_container');
  wallet.on('click', function() {
    // event.preventDefault();
    $('.dropdown').fadeOut('fast');
    $(this).children('.dropdown').fadeIn('fast');
    $('.wallet_container').addClass('wallet_container_selected');
    $(this).removeClass('wallet_container_selected');
  });

  $(document).click(function(event) {
    if (!$(event.target).closest(".wallet_logo_block").length) {
      $('.dropdown').fadeOut('fast');
      $('.wallet_container').removeClass('wallet_container_selected');
    }
  });
});

// menu dropdown
$(document).ready(function() {
  if ($(window).width() <= 720) { return false; }

  var target = $('.menu-dropdown');
  target.on('mousemove', function() {
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    var targetEl = $(this).find('.menu_items-dropdown');
    var targetHeight = targetEl.height();
    var targetOffsetTop = targetEl.offset().top;

    if ((scrollTop + windowHeight) > (targetHeight + targetOffsetTop)) {
      $(targetEl).addClass('down');
    } else {
      $(targetEl).addClass('up');
    }
  });
  target.on('mouseleave', function() {
    var targetEl = $(this).find('.menu_items-dropdown');
    if (targetEl.hasClass('down')) { targetEl.removeClass('down'); }
    if (targetEl.hasClass('up')) { targetEl.removeClass('up'); }
  })
});

// menu dropdown mobile
$(document).ready(function() {
  var target = $('.mobile_menu_items .menu-dropdown .menu-opener');

  target.on('click', function() {
    var managedItem = $(this).closest('.menu-dropdown');
    if (!managedItem.hasClass('open')) {
      managedItem.addClass('open');
    } else {
      managedItem.removeClass('open');
    }
  });
});


$('.coin_stat').on('click', function() {
  $('.coin_box_block').show();
  $('.network_map_block').hide();
  $('.coin_map').removeClass('tg_btn_active');
  $(this).addClass('tg_btn_active');
});

$('.coin_map').on('click', function() {
  $('.coin_box_block').hide();
  $('.network_map_block').show();
  $('.coin_stat').removeClass('tg_btn_active');
  $(this).addClass('tg_btn_active');
});


// chart -----------------------------------------------------------------------
$(document).ready(function() {

  // variables
  var viewPortWidthChart;
  var chartBlockHeight;
  var viewPortChart = $(window);

  // resize func after start
  function windowChartResize() {
    viewPortWidthChart = viewPortChart.width();
    if (viewPortWidthChart > 1024) {
      chartBlockHeight = $('.coin_graph_block').height();
    } else {
      chartBlockHeight = 320
    }
  }

  // run runction after load page
  windowChartResize();


  // chart data
  var options = {
    tooltip: {
      enabled: true,
      x: {
        show: true
      }
    },
    colors:['#4BAB3E'],
    chart: {
      id: 'chart',
      height: chartBlockHeight,
      // type: 'line',
      zoom: {
          enabled: false
      },
      animations: {
        dynamicAnimation: {
            enabled: true,
            speed: 1000
        }
    }
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'straight'
    },
    series: [{
        name: "Price Satoshi",
        data: [0]
        // data: [0]
    }],
    title: {
        text: 'Average TWINS Price (baced on Bitsane.com)',
        align: 'left'
    },
    grid: {
      borderColor: '#28292A',
        row: {
            colors: ['transparent', 'transparent'],
            opacity: 0.5,
        }
    },
    xaxis: {
        categories: ['---', '---'],
        labels: {
          show: false,
        }
    }
  }
  // chart initilization
  var chart = new ApexCharts(
    document.querySelector("#chart"),
    options
  );
  // chart render
  chart.render();

  // adaptive resize behavior
  $(window).resize(function() {
    var vieportWidthChart = $(window).width();
    var vieportHeightChart = $(window).height();

    if (vieportWidthChart > 1024) {
      if (vieportHeightChart < 800) {
        chart.updateOptions({
          chart: {
            height: 300,
          }
        });
      } else if (vieportHeightChart > 800) {
        chart.updateOptions({
          chart: {
            height: 420,
          }
        });
      }
    }
  });

  // update data within graph
  function pushDataChart(price, time) {
    ApexCharts.exec('chart', "updateOptions", {
      xaxis: {
        categories: time
      }
    });
    ApexCharts.exec('chart', "updateSeries", [
      {
        data: price
      }
    ]);
  }

  var reUpdateMonth;
  var reUpdateDay;
  var updateWeek;
  var reUpdateAll;

  // update graph day
  var updateDay = function() {
    $.ajax({
      url: 'https://api.wallet.app/api/get-market-chart/btc/1',
      success: function(data) {

        var prices = data.prices.reverse();

        var btc = prices.map(function(data) {
          return (data.btc * 100000000).toFixed(2);
        });

        var timeDate = prices.map(function(data) {
          var compile = new Date(data.timestamp)
          return compile;
        });

        pushDataChart(btc, timeDate);
      }
    });
    console.log('done1');
    reUpdateDay = setTimeout(updateDay, 600000);
  }

  // update graph 7 days
  var updateWeek = function() {
    $.ajax({
      url: 'https://api.wallet.app/api/get-market-chart/btc/7',
      success: function(data) {

        var prices = data.prices.reverse();

        var btc = prices.map(function(data) {
          return (data.btc * 100000000).toFixed(2);
        });

        var timeDate = prices.map(function(data) {
          var compile = new Date(data.timestamp)
          return compile;
        });

        pushDataChart(btc, timeDate);
      }
    });
    console.log('done2');
    reUpdateWeek = setTimeout(updateWeek, 600000);
  }

  // update graph 30 days
  var updateMonth = function() {
    $.ajax({
      url: 'https://api.wallet.app/api/get-market-chart/btc/30',
      success: function(data) {

        var prices = data.prices.reverse();

        var btc = prices.map(function(data) {
          return (data.btc * 100000000).toFixed(2);
        });

        var timeDate = prices.map(function(data) {
          var compile = new Date(data.timestamp)
          return compile;
        });

        pushDataChart(btc, timeDate);
      }
    });
    console.log('done3');
    reUpdateMonth = setTimeout(updateMonth, 600000);
  }

  // update graph All days
  var updateAll = function() {
    $.ajax({
      url: 'https://api.wallet.app/api/get-market-chart/btc/80',
      success: function(data) {

        var prices = data.prices.reverse();

        var btc = prices.map(function(data) {
          return (data.btc * 100000000).toFixed(2);
        });

        var timeDate = prices.map(function(data) {
          var compile = new Date(data.timestamp)
          return compile;
        });

        pushDataChart(btc, timeDate);
      }
    });
    console.log('done4');
    reUpdateAll = setTimeout(updateAll, 600000);
  }

  // updateAll();
  // updateMonth();
  updateWeek();
  // updateDay();

  $('.btn_24').on('click', function() {
    updateDay();
    clearInterval(reUpdateWeek);
    clearInterval(reUpdateMonth);
    clearInterval(reUpdateAll);
    $('.tg_btn').removeClass('tg_btn_active');
    $(this).addClass('tg_btn_active');
  });

  $('.btn_7').on('click', function() {
    updateWeek();
    clearInterval(reUpdateDay);
    clearInterval(reUpdateMonth);
    clearInterval(reUpdateAll);
    $('.tg_btn').removeClass('tg_btn_active');
    $(this).addClass('tg_btn_active');
  });

  $('.btn_30').on('click', function() {
    updateMonth();
    clearInterval(reUpdateDay);
    clearInterval(reUpdateWeek);
    clearInterval(reUpdateAll);
    $('.tg_btn').removeClass('tg_btn_active');
    $(this).addClass('tg_btn_active');
  });

  $('.btn_all').on('click', function() {
    updateAll();
    clearInterval(reUpdateDay);
    clearInterval(reUpdateWeek);
    clearInterval(reUpdateMonth);
    $('.tg_btn').removeClass('tg_btn_active');
    $(this).addClass('tg_btn_active');
  });

});
