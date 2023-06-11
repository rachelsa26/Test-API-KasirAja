const request = require("supertest")("https://kasir-api.belajarqa.com")
const expect = require("chai").expect;
var token = {}
describe("Testing KasirAja", function(){
    it("Authorization - Registration", async function() {
        const response = await request
        .post('/registration')
        .send({
            name: "nama Toko",
            email: "sample@ex.com",
            password: "123adsfadf@"
        });
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal("Toko berhasil didaftarkan");
        token = response.body.data.accessToken
        //console.log (token)
    })
    it("Authorization - Login", async function() {
        const response = await request
        .post('/authentications')
        .send({
            email: "sample@ex.com",
            password: "123adsfadf@",});
        expect(response.status).to.equal(201);
        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Authentication berhasil ditambahkan");
        var token = response.body.data.accessToken
        //console.log(token)
    })
    it("Authorization - Refresh Token", async function() {
        const response = await request
          .put('/authentications')
          .set('Authorization', `Bearer ${token}`)
          .set(Content-Type, `application/json`)
          .send({
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4ZDc5ZTYxLTFmYzctNDBiNi04MWRjLWY0NGE0ZGFkODc0NyIsImNvbXBhbnlJZCI6IjliY2JiNmYwLTBkMDYtNDIxYy05Y2Y5LTAyNGRjNDM5NmVjNyIsImlhdCI6MTY4NTAxMjMzOH0.jiClynNgzu15ysrTeALWwc8WoLnVIjH1qwqZFDMAbF4"
          });
          
        expect(response.status).to.equal(400);
        expect(response.body.status).to.equal("fail");
        expect(response.body.message).to.equal("Refresh token tidak valid");
        //token = response.body.data.accessToken
        //console.log (token)
    })
    it("Authorization - LogOut", async function() {
        const response = await request
        .delete('/authentications')
        .send({
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODZkNzZkLTllZWYtNDU1OC05M"
        });
        expect(response.status).to.equal(400);
        expect(response.body.status).to.equal("fail");
        expect(response.body.message).to.equal("Refresh token tidak valid");
    })
    it("Create user", async function() { //scenario1
        const response = await request
        .post("/users") //HTTP method dan endpoint
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "ade",
            email: "ade@gmail.com",
            password: "ade"
        });
        expect(response.status).to.eql(401);
        expect(response.body.message).to.eql('Invalid token structure');
        //token = response.body.data.accessToken
        //console.log (token)

    })
    it("Users - Get User Detail", async function() {
        const response = await request
          .get('/users/6d6c1840-ba23-4ae2-80b4-faafe8457123')
          .set('Authorization', `Bearer ${accessToken}`)
          .set(Content-Type, `application/json`);
          
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
        //token = response.body.data.accessToken
        //console.log (token)
    })
     
     
})