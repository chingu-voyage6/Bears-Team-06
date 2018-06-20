import { color as COLORS } from 'config/theme';
import { Validation } from '../Validation';

class Color {
  color = '';

  constructor(color = 'default') {
    this.color = color;
  }

  set(color) {
    this.color = color;
  }

  get(color) {
    if (!color) {
      color = this.color;
    }
    if (COLORS[color]) {
      return COLORS[color];
    } else {
      const validation = new Validation();
      if (
        validation.isHexColor(color) ||
        validation.isRGBAColor(color) ||
        validation.isHSVColor(color)
      ) {
        return color;
      }
    }

    console.error(`ERROR: ${color} is not a color name.`);
    return COLORS['default'];
  }

  type(type = 'default') {
    switch (type) {
      case 'primary':
        return {
          text: COLORS['white'],
          border: COLORS['primary'],
          background: COLORS['primary'],
        };
      default:
        return {
          text: COLORS['white'],
          border: COLORS['black'],
          background: COLORS['black'],
        };
    }
  }
}

export { Color };
