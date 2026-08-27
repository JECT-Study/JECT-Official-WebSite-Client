---
"@jects/jds": minor
---

**Banner / Footer / Image / Logo / MegaMenu / GlobalNavigation / Uploader**

Emotion 기반으로 남아 있던 컴포넌트를 패키지에서 제거합니다. `Image`는 `Thumbnail`로 대체되며, 나머지는 대체 컴포넌트가 없으므로 소비처에서 직접 구현해야 합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                                                                                                                                                                                                          | TO-BE                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `Banner`, `BannerProps`, `BannerBarProps`, `BannerImageProps`, `BannerVariant`                                                                                                                                                                 | 제거 — 대체재 없음                       |
| `Footer`, `FooterRootProps`, `FooterHeaderProps`, `FooterContentProps`, `FooterBottomProps`, `FooterNavProps`, `FooterSocialProps`, `FooterLogoLinkProps`, `FooterLogoDivProps`, `FooterSectionProps`, `FooterSection`, `FooterLink`           | 제거 — 대체재 없음                       |
| `Logo`, `LogoProps`, `LogoHierarchy`                                                                                                                                                                                                           | 제거 — 대체재 없음                       |
| `Uploader`, `UploaderOptions`, `UploaderFileProps`, `UploaderFileButtonProps`, `UploaderImageProps`, `UploaderImageButtonProps`, `UploadError`, `UploadErrorType`                                                                              | 제거 — 대체재 없음                       |
| `GlobalNavigation`, `GlobalNavigationRootProps`, `GlobalNavigationListProps`, `GlobalNavigationToggleItemProps`, `GlobalNavigationBlockItemProps`, `GlobalNavigationLogoItemProps`, `GlobalNavigationLogoLinkProps`, `GlobalNavigationVariant` | 제거 — 대체재 없음                       |
| `useGlobalNavigationVariant`                                                                                                                                                                                                                   | 제거 — 대체재 없음                       |
| `MegaMenu`, `MegaMenuProps`, `MegaMenuSectionProps`, `MegaMenuGroupProps`, `MegaMenuGroupItemProps`                                                                                                                                            | 제거 — 대체재 없음                       |
| `Image`, `ImageOwnProps`                                                                                                                                                                                                                       | `Thumbnail`, `ThumbnailProps`            |
| `ImgRatio`, `ImgOrientation`                                                                                                                                                                                                                   | `ThumbnailRatio`, `ThumbnailOrientation` |
| `Image`의 `fallbackSrc` (`string`)                                                                                                                                                                                                             | `Thumbnail`의 `fallback` (`ReactNode`)   |
| `Image`의 `isReadonly`, `badgeVisible`, `badgeLabel`                                                                                                                                                                                           | 제거 — 대체 prop 없음                    |

`ratio`와 `orientation`은 받는 값이 같지만, `Thumbnail`은 `ratio`가 `1:1`일 때 `orientation`을 `portrait`으로 제한합니다. `1:1`에 `landscape`를 지정하던 호출부는 `orientation`을 지우면 됩니다. `Image`는 기본 `button`으로 렌더되는 폴리모픽 컴포넌트였지만 `Thumbnail`은 `div`로 고정이며, `fallback`을 생략하면 `ThumbnailFallback`이 기본값으로 적용됩니다.

```diff
- <Image
-   src={src}
-   alt='커버 이미지'
-   fallbackSrc='/placeholder.png'
-   ratio='4:5'
-   orientation='landscape'
- />
+ <Thumbnail
+   src={src}
+   alt='커버 이미지'
+   fallback={<img src='/placeholder.png' alt='' />}
+   ratio='4:5'
+   orientation='landscape'
+ />
```
