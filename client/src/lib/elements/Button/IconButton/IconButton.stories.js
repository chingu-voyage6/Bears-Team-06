import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { IconButton } from './';

storiesOf('Buttons/IconButton', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('normal', () => <IconButton name="close" onClick={action('clicked')} />)
  .add('with color', () => (
    <IconButton name="close" onClick={action('clicked')} color="primary" />
  ));
