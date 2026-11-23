import { Path } from 'react-native-svg';
import { CREAM } from './palette';

// Two wavy lines used by the water cryptids (Ogopogo, Nessie, Kraken).
export function Water() {
  return (
    <>
      <Path
        d="M18 66 Q24 62 30 66 T42 66 T54 66 T66 66 T78 66 T84 66"
        stroke={CREAM}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M24 72 Q30 69 36 72 T48 72 T60 72 T72 72 T78 72"
        stroke={CREAM}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    </>
  );
}
