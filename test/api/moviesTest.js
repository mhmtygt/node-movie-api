const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../../app');

chai.use(chaiHttp);

let token;

describe('/api/movies test',()=>{
    before((done)=>{//filmleri listelemek için herhangi bir token al global değişkene at
        chai.request(server).post('/authenticate').send({username:'myigit1',password:'123456'}).end((err,res)=>{
            token=res.body.token;
            //console.log(token);
            done();
            
        });
    });

    describe('GET movies',()=>{
        it('it should GET all movies',(done)=>{
            //this.timeout(300);
           // setTimeout(done, 2000);
            chai.request(server)
            .get('/api/movies')
            .set('x-access-token',token)//token'ı header olarak gönder 
            .end((err,res)=>{
                res.should.have.status(200);//başarılı mı
                res.body.should.be.a('array');//filmler dizi olarak mı dönüyor
                done();

            });
        })
    });

    
});

