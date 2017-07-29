const React = require('react');
const Link = require( 'react-router-dom').Link;
const styled = require('styled-components').default;

    const Menu = styled.ul `
	   margin: 0;
     padding: 0;
     height: 100%;
     width: 100%;
     display: table;
    `;

    const Section = styled.li `
	   display: inline-block;
     width: 25%;
     margin-bottom: 10px;
     margin-top: 10px;
     color: #fff;
     font-size: 24px;
     text-align: center;
     vertical-align: middle;
     display: table-cell;
    `;

    const Component = styled(Link) `
	   text-decoration: none;
     color: #e6e6e6;
    `;

function Nav() {
    return (
            <Menu>
              <Section><Component to='/home'>Home</Component></Section>
              <Section><Component  to='/about'>About</Component></Section>
              <Section><Component  to='/portfolio'>Portfolio</Component></Section>
              <Section><Component  to='/contact'>Contact</Component></Section>
            </Menu>
          )
        }

module.exports = Nav;
