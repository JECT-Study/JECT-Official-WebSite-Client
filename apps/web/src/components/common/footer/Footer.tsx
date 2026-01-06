import { Footer as FooterJds, Logo } from "@ject/jds";

function Footer() {
  return (
    <FooterJds.Root>
      <FooterJds.Content>
        <FooterJds.Header>
          <FooterJds.LogoDiv>
            <Logo href='/' height={16} hierarchy='inverse' />
          </FooterJds.LogoDiv>
          <FooterJds.Social
            github='https://github.com/JECT-Study'
            instagram='https://www.instagram.com/ject.official'
          />
        </FooterJds.Header>
        <FooterJds.Divider />
        <FooterJds.Bottom
          copyright='© 2025 JECT. All rights reserved.'
          email='jectofficial@ject.kr'
          privacyLink='https://cultured-phalange-7de.notion.site/2cd62a893ac580129760c2b304eacec5'
        />
      </FooterJds.Content>
    </FooterJds.Root>
  );
}

export default Footer;
