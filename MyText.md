# Express-Session??

npm install express-session 설치
미들웨어로서 사용한다. 임포트 필요.

passport initialize 의 전 위치에 미들웨어로서 session이란 이름으로 선언해준다. app.use({고려해야 하는 옵션이 있다})

- [ ] 옵션1 : 가장 중요한 옵션은 secret. 이것은 랜덤문자열로서, 쿠키에 들어있는 세션ID를 암호화하기 위한 것이다. 반드시 들어가야 하는 옵션이다.
- [ ] 사용법 : app.use( session({ secret : 내가지정할수 있는 랜덤문자...(randomkeyzen 홈페이지로 가서 만들어와도 된다)}) )
  - [ ] 만약 내가 DOTENV를 사용중이라면 랜덤문자를 캡슐화해두자. 누군가 보지 못하도록.
  - [ ] 최종적인 사용은 app.use(session({ secret : process.env.캡슐화한문자}))
- [ ] 옵션2 : resave 옵션.
  - [ ] 사용법 : secret 밑에 선언. resave : true
- [ ] 옵션3 : saveUninitialized 옵션. 로그인 세션에 이용하려면 false 값을 쓰자.
  - [ ] 사용법 : 똑같이 선언. saveUninitialized : false
- [ ] 이렇게 해주면 브라우져 검사의 어플리케이션 란의 쿠키에서 connect.sid라는 이름의 값을 확인가능하다면 정상적으로 로그인이 만들어진것.
- [ ] session은 쿠키를 해독하여 유저정보를 express에 넘겨준다.
- [ ] session정보는 계속 유지될것인가? 메모리에 저장하는 한 유지가 되지 않는다. 서버를 재시작하면 세션정보는 사라진다.
- [ ] 따라서 데이터베이스를 이용해서 세션데이터를 저장해야 한다.
- [ ] 이제 우리는 커넥트 몽고라는 미들웨어를 이용해야 한다.

# connect-mongo

설치 npm i connect-mongo. 미들웨어로서 app.js에 임포트시킨다.

- [ ] 사용법 : express-session 설정시 옵션으로 넣어주면 된다.
- [ ] 옵션1 : 아래와 같이 변수로서 선언을 해준다.
      단, 세션 오브젝트를 옵션으로 필요로 하므로 위에서 선언한 세션오브젝트를 옵션에 넣어주면 된다.

      const cookieStore = new MongoStore(session)

- [ ] 사용법2 : 그런다음, app.session({ }) 의 정의부분에 와서 store를 정의해주면 된다.

        app.use(session({
        store: new MongoStore({}),
        url: 'mongodb://localhost/test-app',
        }));

  그런다음 우리는 몽고스토어를 몽고디비와 연결을 시켜줄 필요가 있다. 또한 몽고디비와의 연결을 시켜주는 건 몽구스 이므로 app.js에 몽구스를 임포트할 필요도 있다.

        store: new CookieStore({ mongooseConnection: mongoose.connection }),

        따라서 결과적으로 몽구스는 쿠키가 저장될 이 스토어를 몽고디비에 연결을 시킬것이다. 이렇게 함으로서 로그인 한 유저의 세션데이터가 몽고디비에 저장되고, 서버가 리셋이 되어도 유저의 쿠키데이터는 유지가 된다.

# passport-github

사용하기 위해서는 우선 gitgub에서 개발자 등록이 필요하다.

https://github.com/settings/applications/new 이 곳에서 등록하고 인증키를
받아야 한다. 또한, 깃허브 요청방식으로 로그인시 접속하는 라우터를 별도로 만들어 주어야 하며, 인증을 받고 돌아왔을때 접속되는 경로도 만들어 주어야 한다. 그 경로는 '/auth/github', 인증을 받은 뒤 콜백이 접속할 경로는 '/auth/github/callback' 가 좋을것 같다.

- [ ] 작동 메커니즘 : 우선 인증을 요청한 사용자를 특별한 URL을 써서 깃허브로 보낸다. 그 다음 깃허브에서 인증을 받은 뒤 다시 유저정보가 우리의 페이지로 돌아오는데, 그때 우리가 요청한 사용자의 인증 정보도 같이 들어오게 된다.
- [ ] 우선 깃허브에 인증을 요청하는 함수를 작성하자. 이 함수는 라우터에 들어가는 컨트롤러로서 선언해도 좋고, 어쨌든 라우터안의 콜백함수 정의해도 좋다.

      export const githubLogin = passport.authenticate("github");

- [ ] Register a new OAuth application 란의 Authorization callback URL 칸에 이렇게 타이핑을 하자. http://localhost:4000/auth/github/callback 인증 URL을 입력해 주는 것이다. 사실 경로는 자신이 마음대로 해도 상관은 없다.
- [ ] 깃허브 인증을 받기 위해서는 이것을 임포트해서 사용해 줄 필요가 있다. 또한 방금 깃허브에서의 등록작업으로 우리는 클라이언트아이디와 클라이언트시크릿을 얻게 되었으므로 그것도 같이 활용해 준다. 단, 이것은 민감한 정보이므로 DOTENV로 캡슐화 작업을 해주는게 좋다.
- [ ] 그 다음 사용자가 깃허브에서 돌아왔을때 실행될 동작의 콜백함수가 필요하다.

      export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
      console.log(accessToken, refreshToken, profile, cb);
      };

- [ ] 동작의 흐름 : 깃허브에 의한 사용자 인증 요청이 발생하면, 처음에는 해당하는 라우터로 이동하게 된다. globalRouter.get(routes.github, githubLogin); 즉 이 routes에 정의한 라우터 경로로 이동하여 콜백함수를 실행하게 되는데, githubLogin 함수는

      export const githubLogin = passport.authenticate("github");

패스포트에 의한 인증을 깃허브 방식으로 하여 진행되는데,

      passport.use( new GithubStrategy(
          {
            clientID: process.env.GH_ID,
            clientSecret: process.env.GH_SECRET,
            callbackURL: `http://localhost:4000${routes.githubCallback}`,
          }, githubLoginCallback
        )
      );

그다음 깃허브에서 유저 인증을 받고 돌아온 유저는 위의 callbackURL에 의해 "/auth/github/callback" 경로로 접속을 시도하게 된다 따라서 라우트에 인증을 받고 정보를 가지고 돌아온 유저를 로그인 시켜줘야 할 필요가 있다. 따라서 라우터에 깃허브로그인 후 돌아왔을때의 위의 경로에 접속했을때 githunLoginCallback 함수가 실행이 된다.
