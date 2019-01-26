import React from 'react';
import { Header, Image } from 'semantic-ui-react';

const LandingPage = () => (
    <div>
        <Image centered size='medium' bordered circular src='https://avatars3.githubusercontent.com/u/13274342?s=400&u=6d35ccd344a054c2242942761fd8972026c273ce&v=4' />
        <Header as='h2' icon textAlign='center' inverted color='teal'>
            {/* <Icon name='users' circular /> */}
            <Header.Content>Hello, Goddag, Xin Chào</Header.Content>
        </Header>
        <Header as='h2' textAlign='center' inverted color='teal'>
            <Header.Content>My name is Minh and I'm a web developer</Header.Content>
            <Header.Subheader>I can speak Vietnamese, Danish and English</Header.Subheader>
        </Header>

        <br />
        <br />
        <br />
            <ul>
                <li>
                    <p>This boilerplate is bootstrapped with:</p>
                </li>
                <ul>
                    <li><b>create-react-app</b></li>
                    <li><b>Semantic UI</b></li>
                    <li><b>Firebase</b></li>
                </ul>
                <li>
                    <p>The authentication and authorization is implemented using HOC and reactContext</p>
                </li>
                <li>
                    <p>Link to the github repo: </p>
                    <ul>
                        <li>
                            <a href="https://github.com/minhkuheo/create-react-app-semantic_ui-firebase">https://github.com/minhkuheo/create-react-app-semantic_ui-firebase</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <h4>Two UI frameworks that I personally like::</h4>
                    <ul>
                        <li><a href="https://reactstrap.github.io/">Reactstrap (Bootstrap v4)</a></li>
                        <li><a href="https://react.semantic-ui.com/">Semantic UI</a></li>
                    </ul>
                </li>
                <li>
                    <h4>Note:</h4>
                    <ul>
                        <li>
                            <p>This boilerplate has been made from a tutorial of Robin Rwieruch with my own tweaks</p>
                            <p>This tutorial helps me to:</p>
                            <ul>
                                <li><p>Get update with the newest React tech such as HOC and contextAPI</p></li>
                                <li><p>Learn more about the design structure</p></li>
                                <li><p>Think in a Reactive manner</p></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
    </div>
    // <Grid>
    //     <Grid.Row>
    //         <Grid.Column width={8}>
    //             <h1>Hello, Goddag, Xin Chào</h1>
    //             <h3>Welcome to this little place of mine !</h3>
    //             <h4>My name is Minh and I'm a web developer</h4>
    //             <p></p>
    //         </Grid.Column>
    //         <Grid.Column width={4}>
    //             <img src="https://avatars3.githubusercontent.com/u/13274342?s=400&u=6d35ccd344a054c2242942761fd8972026c273ce&v=4" width="200px" alt="MyPic" />
    //         </Grid.Column>
    //     </Grid.Row>

    //     <Grid.Row>

    //     </Grid.Row>
    // </Grid>
);

export default LandingPage;