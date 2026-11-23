import type { ComponentType } from 'react';

import ChupacabraArt from '../art/Chupacabra';
import JackalopeArt from '../art/Jackalope';
import JerseyDevilArt from '../art/JerseyDevil';
import KrakenArt from '../art/Kraken';
import ManateeArt from '../art/Manatee';
import MothmanArt from '../art/Mothman';
import NessieArt from '../art/Nessie';
import OgopogoArt from '../art/Ogopogo';
import SasquatchArt from '../art/Sasquatch';
import YetiArt from '../art/Yeti';

/**
 * THE list of cryptids. To add or swap one, edit this file
 * (and drop its drawing in src/art/). Nothing else needs to change.
 *
 * - id:    stable key, saved on the phone. Don't rename an existing id.
 * - name:  shown in the app
 * - color: the coin face colour
 * - Art:   the drawing (100×100 box)
 */
export type Cryptid = {
  id: string;
  name: string;
  color: string;
  Art: ComponentType;
};

export const CRYPTIDS: Cryptid[] = [
  { id: 'chupacabra', name: 'Chupacabra', color: '#C0573E', Art: ChupacabraArt },
  { id: 'ogopogo', name: 'Ogopogo', color: '#3E7CA8', Art: OgopogoArt },
  { id: 'manatee', name: 'Manatee', color: '#7FA7A0', Art: ManateeArt }, // the joke one
  { id: 'sasquatch', name: 'Sasquatch', color: '#6E8B4E', Art: SasquatchArt },
  { id: 'yeti', name: 'Yeti', color: '#6F93B6', Art: YetiArt },
  { id: 'nessie', name: 'Nessie', color: '#4E7A6E', Art: NessieArt },
  { id: 'mothman', name: 'Mothman', color: '#6B5B8C', Art: MothmanArt },
  { id: 'jerseydevil', name: 'Jersey Devil', color: '#8E3B46', Art: JerseyDevilArt },
  { id: 'jackalope', name: 'Jackalope', color: '#D9A441', Art: JackalopeArt },
  { id: 'kraken', name: 'Kraken', color: '#2F5D73', Art: KrakenArt },
];

export const DEFAULT_SIDE_A = 'chupacabra';
export const DEFAULT_SIDE_B = 'ogopogo';

/** Look up a cryptid by id. Falls back to the first one if the id is unknown. */
export function getCryptid(id: string): Cryptid {
  return CRYPTIDS.find((c) => c.id === id) ?? CRYPTIDS[0];
}

export function isCryptidId(id: unknown): id is string {
  return typeof id === 'string' && CRYPTIDS.some((c) => c.id === id);
}
