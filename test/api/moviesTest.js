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
        });
    });

    describe('POST movies',()=>{
        
        it('it should POST a movie',(done)=>{
            const testMovie={
                title:'test movie',
                directorID:'5bf9580b02b2c530c8f230e3',
                category:'Crime',
                country:'Turkey',
                year:'1996',
                imdbScore:'9.9'
            };
            chai.request(server)
                .post('/api/movies')
                .send(testMovie)
                .set('x-access-token',token)
                .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('directorID');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdbScore');
                done();
            });
        });
    });
});

