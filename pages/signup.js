import Signup from '../components/Signup';
import styled from 'styled-components';

const columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = props => (
   <columns>
      <Signup />
      <Signup />
      <Signup />
   </columns>
);

export default SignupPage;