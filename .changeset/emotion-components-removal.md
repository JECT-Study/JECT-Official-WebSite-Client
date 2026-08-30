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
| `Image`의 `as`                                                                                                                                                                                                                                 | `Thumbnail`의 `asChild`                  |
| `Image`의 `isReadonly`, `badgeVisible`, `badgeLabel`                                                                                                                                                                                           | 제거 — 대체 prop 없음                    |

`ratio`와 `orientation`은 동일한 값을 받지만, `Thumbnail`은 `ratio`가 `1:1`일 때 `orientation`을 `portrait`으로 제한합니다. `1:1`에 `landscape`를 지정한 호출부는 `orientation`을 제거하면 됩니다.

`Image`는 `as`에 요소 타입을 넘겨 렌더할 요소를 지정할 수 있었고, 기본값은 `button`이었습니다. `Thumbnail`은 `div`로 렌더하며 `asChild`를 지정하면 `div` 대신 전달한 자식 요소에 스타일을 합성합니다. 기본 루트가 `button`에서 `div`로 바뀌므로, `as` 없이 `Image`를 클릭 대상으로 사용하던 호출부는 `asChild`로 `button`을 전달해야 합니다. `fallback`을 생략하면 `ThumbnailFallback`이 기본으로 적용됩니다.

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
