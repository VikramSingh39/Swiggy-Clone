import React from 'react'

class About extends React.Component{
      constructor(props){
            super(props);

            this.state = {
                  userInfo:{
                        avatar_url: 'null',
                        name: 'Dummy Name',
                        location: 'null ',
                        public_repos: 'null',
                        url: 'null',

                  }
            };
      }


 async componentDidMount(){
      const data = await fetch("https://api.github.com/users/VikramSingh39");
      const json = await data.json();
      console.log(json);

      this.setState({
            userInfo: json,
      })
 }

 render(){
      const {name, location, avatar_url, public_repos, url} = this.state.userInfo;


      return(
            <div className='about_card'>
                  <img src={avatar_url} alt="" />
                  <h2>Name: {name}</h2>
                  <h3>Location: {location}</h3>
                  <h3>Github Repo Count: {public_repos}</h3>
                  <h3>Github URL: <a href={url} target='_blank'>Click Here</a></h3 >
            </div>
      )
 }

}
export default About;