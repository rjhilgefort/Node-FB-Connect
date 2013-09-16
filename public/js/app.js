/****************************************************************************
 *
 * On Document Ready...
 *
 ***************************************************************************/
$(function(){

  var loadingSpinner = '<i class="icon-spinner icon-spin"></i>';
  var no_profile_pic = 'img/no-profile-pic.jpg';

  //user info
  var user = {
    $status: $('td#user-status'),
    $name: $('td#user-name'),
    $id: $('td#user-id'),
    $email: $('td#user-email'),
    $home: $('td#user-home'),
    $pic: $('img#user-picture')
  }
  //set empty picture on load
  user.$pic.attr('src', no_profile_pic);

  // auth_action_button
  var aab = {
    $obj: $('button#auth-action-btn'),
    state: 'loading', // connected, disconnected, loading
    loading: function() {
      this.$obj.html(loadingSpinner);
      this.state = 'loaging';
      user.$status.html(loadingSpinner);
      user.$name.html(loadingSpinner);
      user.$id.html(loadingSpinner);
      user.$email.html(loadingSpinner);
      user.$home.html(loadingSpinner);
      user.$pic.attr('src', no_profile_pic);
    },
    connected: function(response) {
      //send authtoken to server to get user fb graph info
      $.ajax({
        url: "/getFacebookInfo",
        type: 'POST',
        data: {authResponse: response.authResponse},
        async: true,
        success: function (data) {
          aab.$obj.html('<i class="icon-signout"></i> Logout');
          aab.state = 'connected';
          user.$status.html('Connected');
          user.$name.html(data.name);
          user.$id.html(data.id);
          user.$home.html(data.home);
          user.$pic.attr('src', 'https://graph.facebook.com/'+data.id+'/picture?type=large');
        },
        error: function () {},
        complete: function() {}
      });

      // Get user info via client side API as an alternative to above method
      // FB.api('/me', function(response) {
      //   aab.$obj.html('<i class="icon-signout"></i> Logout');
      //   aab.state = 'connected';
      //   user.$status.html('Connected');
      //   user.$name.html(data.name);
      //   user.$id.html(data.id);
      //   user.$home.html(data.home);
      //   user.$pic.attr('src', 'https://graph.facebook.com/'+data.id+'/picture?type=large');
      // });
    },
    disconnected: function() {
      this.$obj.html('<i class="icon-signin"></i> Login');
      this.state = 'disconnected';
      user.$status.html('Disconnected');
      user.$name.html('');
      user.$id.html('');
      user.$email.html('');
      user.$home.html('');
      user.$pic.attr('src', no_profile_pic);
    }
  }

  var myFB =
  {
    getLoginStatus: function() {
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          // var authResponse = response.authResponse;
          aab.connected(response);
        } else if (response.status === 'not_authorized') {
          aab.disconnected();
        } else {
          aab.disconnected();
        };
      });
    },

    login: function() {
      FB.login(function(response) {
        if (response.authResponse) {
          aab.connected(response);
        } else {
          // user did not fully authenticate or cancelled login
          aab.disconnected();
        }
      });
    },

    logout: function() {
      FB.logout(function(response) {
        aab.disconnected();
      });
    }
  };

  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/all.js', function(){
    FB.init({
      appId: '377687199000826',
      channelUrl: 'http://qkyv.localtunnel.me/channel.html',
    });
    myFB.getLoginStatus();

    // FB.Event.subscribe('auth.statusChange', function(response) {
    //   myFB.getLoginStatus();
    // });
  });

  // auth_action_btn click event
  aab.$obj.click(function() {
    if (aab.state === 'loading') {
      return false;
    } else if (aab.state === 'connected') {
      aab.loading();
      myFB.logout();
    } else if (aab.state === 'disconnected') {
      aab.loading();
      myFB.login();
    } else { /* unreachable */};
  });
});//end of document.ready