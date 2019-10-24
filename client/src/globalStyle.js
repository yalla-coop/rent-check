import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root {
  
  /* COLORS */
  --blue: #346799;
  --lightBlue: #87B1DB;

  --pink: #D7448F;
  --gray: #595959;

  --white: #fff;
  --green: #5EAD5B;
  --red: #FF4C4C;

  /* useCase colors */
  --A1: #ff80cc;
  --A3: #9eebcf;
  --B1: #96ccff;
  --B2: #fbf1a9;
  --B8: #ffb700;
  --D1: #a463f2;
  --D2: #ff6300;

  /* status colors */
  --verified: var(--green);
  --unverified: var(--blue);
  --rejected: var(--red);
  --awaitingSuperUser: var(--B8);
  --invalid: var(--gray);
}
`;
