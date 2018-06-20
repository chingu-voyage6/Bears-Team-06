import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { Button } from './';

storiesOf('Buttons/Button', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('normal', () => <Button onClick={action('clicked')}>Button</Button>)
  .add('outline', () => (
    <Button onClick={action('clicked')} outline>
      Button
    </Button>
  ))
  .add('with color', () => (
    <Button onClick={action('clicked')} color="primary">
      Button
    </Button>
  ))
  .add('outline with color', () => (
    <Button onClick={action('clicked')} color="primary" outline>
      Button
    </Button>
  ))
  .add('with backgroundColor', () => (
    <Button onClick={action('clicked')} backgroundColor="primary">
      Button
    </Button>
  ));
