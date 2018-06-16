import styled from 'styled-components';

import { transformTag } from '../../helpers';
import { Color } from '../../utilities';

const Tag = styled(transformTag)`
  color: ${props => new Color(props.color).get()};
`;

export default Tag;
