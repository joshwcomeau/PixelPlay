describe("User service", function() {
  var User, httpBackend, mockResponse;

  beforeEach(module("pixelPlay"));

  beforeEach(inject(function(_User_, $httpBackend) {
    User         = _User_;
    httpBackend  = $httpBackend;
    mockResponse = {"success":true,"status":200,"error":false,"data":{"user":{"id":10634283,"username":"JoshuaComeau","firstname":"Joshua","lastname":"Comeau","birthday":null,"sex":1,"city":null,"state":null,"country":null,"registration_date":"2014-12-08T13:16:05-05:00","about":null,"usertype":0,"domain":"JoshuaComeau.500px.com","fotomoto_on":false,"locale":"en","show_nude":false,"allow_sale_requests":1,"fullname":"Joshua Comeau","userpic_url":"https://secure.gravatar.com/avatar/c7b36bc6fcbb1e531b8d0e847215853c?s=300&r=g&d=https://pacdn.500px.org/userpic.png","userpic_https_url":"https://secure.gravatar.com/avatar/c7b36bc6fcbb1e531b8d0e847215853c?s=300&r=g&d=https://pacdn.500px.org/userpic.png","upgrade_status":2,"store_on":false,"photos_count":0,"affection":0,"in_favorites_count":0,"friends_count":0,"followers_count":0,"analytics_code":null,"invite_pending":false,"invite_accepted":false,"email":"twoequalsone@live.com","upload_limit":null,"upload_limit_expiry":"2014-12-09T09:51:01-05:00","upgrade_type":1,"upgrade_status_expiry":"2014-12-22","auth":{"facebook":1,"twitter":0,"google_oauth2":0},"presubmit_for_licensing":null,"contacts":{"facebook":"100007589858654"},"equipment":{},"avatars":{"default":{"http":"http://www.gravatar.com/avatar/c7b36bc6fcbb1e531b8d0e847215853c?s=300&r=g&d=https://pacdn.500px.org/userpic.png","https":"https://secure.gravatar.com/avatar/c7b36bc6fcbb1e531b8d0e847215853c?s=300&r=g&d=https://pacdn.500px.org/userpic.png"},"large":{"http":"http://www.gravatar.com/avatar/c7b36bc6fcbb1e531b8d0e847215853c?s=100&r=g&d=https://pacdn.500px.org/userpic.png","https":"https://secure.gravatar.com/avatar/c7b36bc6fcbb1e531b8d0e847215853c?s=100&r=g&d=https://pacdn.500px.org/userpic.png"},"small":{"http":"http://www.gravatar.com/avatar/c7b36bc6fcbb1e531b8d0e847215853c?s=50&r=g&d=https://pacdn.500px.org/userpic.png","https":"https://secure.gravatar.com/avatar/c7b36bc6fcbb1e531b8d0e847215853c?s=50&r=g&d=https://pacdn.500px.org/userpic.png"},"tiny":{"http":"http://www.gravatar.com/avatar/c7b36bc6fcbb1e531b8d0e847215853c?s=30&r=g&d=https://pacdn.500px.org/userpic.png","https":"https://secure.gravatar.com/avatar/c7b36bc6fcbb1e531b8d0e847215853c?s=30&r=g&d=https://pacdn.500px.org/userpic.png"}}}}};
  }));

  it('should send a request to say hello', function () {
    httpBackend.expect('GET', 'https://api.500px.com/users').respond(200, mockResponse);
    data = User.updateUser("authorized");
    console.log(data);
    httpBackend.flush();
    console.log(data);
    expect(data.success).to.equal(mockResponse.success);
  });


});

