---
"@jects/jds": minor
---

**Icon**

아이콘 SVG와 공개 `IconName`을 Lucide 기준으로 변경합니다. 기존 이름을 사용하는 코드는 아래 신규 이름으로 변경해야 하며, 동일한 이름을 유지하는 일부 아이콘도 Lucide 형태로 변경됩니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                            | TO-BE                    |
| ---------------------------------------------------------------- | ------------------------ |
| `account-circle-line`                                            | `circle-user-round`      |
| `user-line`                                                      | `user-round`             |
| `bookmark-fill`, `bookmark-line`                                 | `bookmark`               |
| `flag-fill`, `flag-line`                                         | `flag`                   |
| `notification-line`                                              | `bell`                   |
| `question-line`                                                  | `circle-question-mark`   |
| `information-fill`, `information-line`                           | `info`                   |
| `sun-line`                                                       | `sun`                    |
| `moon-line`                                                      | `moon`                   |
| `eye-line`                                                       | `eye`                    |
| `eye-off-line`                                                   | `eye-off`                |
| `arrow-down-line`                                                | `arrow-down`             |
| `arrow-left-line`                                                | `arrow-left`             |
| `arrow-right-line`                                               | `arrow-right`            |
| `arrow-up-line`                                                  | `arrow-up`               |
| `arrow-left-down-line`                                           | `arrow-down-left`        |
| `arrow-right-down-line`                                          | `arrow-down-right`       |
| `arrow-left-up-line`                                             | `arrow-up-left`          |
| `arrow-right-up-line`                                            | `arrow-up-right`         |
| `arrow-down-s-fill`, `arrow-down-s-line`, `arrow-down-wide-line` | `chevron-down`           |
| `arrow-left-s-line`                                              | `chevron-left`           |
| `arrow-right-s-line`                                             | `chevron-right`          |
| `arrow-up-s-fill`, `arrow-up-s-line`, `arrow-up-wide-line`       | `chevron-up`             |
| `arrow-go-back-line`                                             | `undo-2`                 |
| `arrow-go-forward-line`                                          | `redo-2`                 |
| `corner-down-left-line`                                          | `corner-down-left`       |
| `corner-down-right-line`                                         | `corner-down-right`      |
| `reset-left-line`                                                | `rotate-ccw`             |
| `restart-line`                                                   | `rotate-cw`              |
| `download-2-line`                                                | `download`               |
| `upload-2-line`                                                  | `upload`                 |
| `external-link-line`                                             | `external-link`          |
| `export-line`                                                    | `file-down`              |
| `cursor-line`                                                    | `mouse-pointer`          |
| `home-2-fill`, `home-2-line`                                     | `house`                  |
| `computer-line`                                                  | `monitor`                |
| `smartphone-line`                                                | `smartphone`             |
| `tablet-line`                                                    | `tablet`                 |
| `spinner`                                                        | `loader-circle`          |
| `effect`                                                         | `zap`                    |
| `layer`                                                          | `layers`                 |
| `pencil-line`                                                    | `pencil`                 |
| `flow-chart`                                                     | `workflow`               |
| `robot-line`                                                     | `bot`                    |
| `qr-code-line`                                                   | `qr-code`                |
| `slash-command`                                                  | `square-slash`           |
| `delete-bin-line`                                                | `trash`                  |
| `file-3-line`                                                    | `file`                   |
| `file-text-line`                                                 | `file-text`              |
| `file-unknow-line`                                               | `file-question-mark`     |
| `file-warning-line`                                              | `file-exclamation-point` |
| `folder-4-line`                                                  | `folder`                 |
| `coin-line`                                                      | `coins`                  |
| `draggable`                                                      | `grip-vertical`          |
| `more-horizontal`                                                | `ellipsis`               |
| `more-vertical`                                                  | `ellipsis-vertical`      |
| `menu-line`                                                      | `menu`                   |
| `global-line`                                                    | `globe`                  |
| `guide-line`                                                     | `route`                  |
| `heart-3-fill`, `heart-3-line`                                   | `heart`                  |
| `megaphone-line`                                                 | `megaphone`              |
| `add-line`                                                       | `plus`                   |
| `subtract-line`                                                  | `minus`                  |
| `image-line`                                                     | `image`                  |
| `circle-fill`, `circle-line`                                     | `circle`                 |
| `square-fill`, `square-line`                                     | `square`                 |
| `alert-fill`, `alert-line`                                       | `triangle-alert`         |
| `error-warning-line`                                             | `circle-alert`           |
| `error-warning-octagon-line`                                     | `octagon-alert`          |
| `check-line`                                                     | `check`                  |
| `close-line`                                                     | `x`                      |
| `at-line`                                                        | `at-sign`                |
| `attachment-line`, `link-diagonal-line`                          | `paperclip`              |
| `chat-line`                                                      | `message-circle`         |
| `code-s-slash-line`                                              | `code-xml`               |
| `link-line`                                                      | `link`                   |
| `mail-fill`, `mail-line`                                         | `mail`                   |
| `message-2-line`                                                 | `message-square-more`    |
| `save-line`                                                      | `save`                   |
| `search-line`                                                    | `search`                 |
| `sticky-note-line`                                               | `sticky-note`            |
| `text`                                                           | `type`                   |
| `calendar-line`                                                  | `calendar-days`          |
| `cloud-fill`, `cloud-line`                                       | `cloud`                  |
| `absolute`                                                       | `focus`                  |
| `bar`                                                            | `separator-vertical`     |
| `blank`                                                          | `square-dashed`          |
| `function-line`, `style`                                         | `layout-grid`            |
| `instance`                                                       | `diamond`                |
| `line`                                                           | `slash`                  |
| `property`                                                       | `toggle-right`           |
| `radius-angled`, `radius-circle`, `radius-rounded`               | `square-round-corner`    |
| `variable`                                                       | `hexagon`                |
| `vector`                                                         | `vector-square`          |

```diff
-<Icon name='information-line' />
+<Icon name='info' />

-<Icon name='arrow-right-s-line' />
+<Icon name='chevron-right' />

-<Icon name='delete-bin-line' />
+<Icon name='trash' />
```

**추가**

- `arrow-down-left`, `arrow-down-right`, `arrow-up-left`, `arrow-up-right`
- `case-sensitive`, `copy`, `hash`, `move-horizontal`, `table-of-contents`
- `contrast`, `panel-left`, `square-plus`
- `clock-3`, `maximize-2`, `minimize-2`, `ruler`, `toggle-left`
- `frown`, `laugh`, `meh`, `zoom-in`, `zoom-out`

**동작 변경 (코드 수정 불필요)**

- `asterisk`, `component`, `frame`, `shapes` SVG를 Lucide 형태로 변경
- SVG의 `#1B1C21` 색상을 `currentColor`로 변환하도록 SVGR 설정 변경
