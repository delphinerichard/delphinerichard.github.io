import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AvailableLang } from './@interfaces/translations';

const AT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v80 32c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/></svg>`;
const LINKEDIN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>`;
const GITHUB_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>`;
const FRENCH_ICON = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 356.18"><path fill="#E1000F" d="M345.04 0h139C499.44.1 512 12.72 512 28.13v299.91c0 15.47-12.65 28.13-28.13 28.14H345.04V0zM15.11 352.95zm-9.54-8.15z"/><path fill="#fff" d="M27.96 0h317.08v356.18H27.98C12.57 356.09 0 343.46 0 328.04V28.14C0 12.72 12.56.1 27.96 0z"/><path fill="#273375" d="M27.96 0h138.99v356.18H28c-15.42-.08-28-12.71-28-28.14V28.14C0 12.72 12.56.1 27.96 0z"/></svg>`;
const UK_ICON = `<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 55.2 38.4" style="enable-background:new 0 0 55.2 38.4" xml:space="preserve"><style type="text/css">.st0{fill:#FEFEFE;} .st1{fill:#C8102E;} .st2{fill:#012169;}</style><g><path class="st0" d="M2.87,38.4h49.46c1.59-0.09,2.87-1.42,2.87-3.03V3.03c0-1.66-1.35-3.02-3.01-3.03H3.01 C1.35,0.01,0,1.37,0,3.03v32.33C0,36.98,1.28,38.31,2.87,38.4L2.87,38.4z"/><polygon class="st1" points="23.74,23.03 23.74,38.4 31.42,38.4 31.42,23.03 55.2,23.03 55.2,15.35 31.42,15.35 31.42,0 23.74,0 23.74,15.35 0,15.35 0,23.03 23.74,23.03"/><path class="st2" d="M33.98,12.43V0h18.23c1.26,0.02,2.34,0.81,2.78,1.92L33.98,12.43L33.98,12.43z"/><path class="st2" d="M33.98,25.97V38.4h18.35c1.21-0.07,2.23-0.85,2.66-1.92L33.98,25.97L33.98,25.97z"/><path class="st2" d="M21.18,25.97V38.4H2.87c-1.21-0.07-2.24-0.85-2.66-1.94L21.18,25.97L21.18,25.97z"/><path class="st2" d="M21.18,12.43V0H2.99C1.73,0.02,0.64,0.82,0.21,1.94L21.18,12.43L21.18,12.43z"/><polygon class="st2" points="0,12.8 7.65,12.8 0,8.97 0,12.8"/><polygon class="st2" points="55.2,12.8 47.51,12.8 55.2,8.95 55.2,12.8"/><polygon class="st2" points="55.2,25.6 47.51,25.6 55.2,29.45 55.2,25.6"/><polygon class="st2" points="0,25.6 7.65,25.6 0,29.43 0,25.6"/><polygon class="st1" points="55.2,3.25 36.15,12.8 40.41,12.8 55.2,5.4 55.2,3.25"/><polygon class="st1" points="19.01,25.6 14.75,25.6 0,32.98 0,35.13 19.05,25.6 19.01,25.6"/><polygon class="st1" points="10.52,12.81 14.78,12.81 0,5.41 0,7.55 10.52,12.81"/><polygon class="st1" points="44.63,25.59 40.37,25.59 55.2,33.02 55.2,30.88 44.63,25.59"/></g></svg>`;
const NEST = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M302.132 73.922c-9.305-14.646-6.329-24.304-1.194-34.275c4.597-8.926 6.475-24.438-9.768-36.645c14.955-5.505 38.554 4.228 38.96 22.055c-8.678 11.94-32.382 16.685-27.998 48.865m107.371 329.114c-7.26 23.534-3.95 36.056-35.526 84.92c55.83-37.69 82.17-86.35 90.863-141.577c5.458 23.029 5.974 43.918 3.83 63.656c46.264-60.907 77.963-183.728-28.659-307.19c-4.289 54.573-57.068 97.543-117.937 80.694C426.44 172.034 433.13 39.324 343.47 8.68c1.751 36.92-48.622 24.83-33.808 74.222c-51.308-29.029-163.409-34.995-207.974 9.046c-22.974 22.704-38.656 41.481-67.369 42.722c-23.707 1.024-55.013 39.494-14.281 59.168c3.89 16.395 17.562 25.73 25.49 27.339c-1.973 29.195 4.238 14.31 13.338 1.584c-3.058 36.905 1.982 23.61 16.244 4.623c120.67-24.404 187.31 74.004 188.064 134.446c-.53-10.966-18.061-23.72-27.338-20.207c-6.268 13.28-13.098 24.551-21.527 30.112c.881-8.805.28-17.61-1.32-26.414c-2.78 10.647-8.013 21.703-16.377 33.281c-16.638.929-39.923-11.446-33.15-31.96c9.555-19.95-9.186-24.098-24.284-18.387c-11.345 4.292-19.012 16.178-20.06 19.874c-3.785 13.331-2.54 43.094 23.346 62.83c-6.786 1.25-13.753 2.364-18.49 5.15c44.033 26.631 88.978 17.633 114.006 7.584c40.978-16.453 69.241-61.994 73.663-97.125c11.374 49.414-9.003 104.332-54.678 133.786c13.05 1.381 38.593-7.46 64.713-16.773c-19.746 24.85-43.349 48.414-82.014 66.958c76.158-6.38 131.863-44.618 169.84-107.503"/></svg>`;
const REACT = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10.11c1.03 0 1.87.84 1.87 1.89c0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7c-.52-.59-1.03-1.23-1.51-1.9a23 23 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86c.27.06.57.11.88.16zm6.54-.76l.81-1.5l-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47c.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7c.52.59 1.03 1.23 1.51 1.9c.82.08 1.63.2 2.4.36c.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86c-.27-.06-.57-.11-.88-.16zm1.45-7.05c1.47.84 1.63 3.05 1.01 5.63c2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63c-1.46.84-3.45-.12-5.37-1.95c-1.92 1.83-3.91 2.79-5.38 1.95c-1.46-.84-1.62-3.05-1-5.63c-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63c1.47-.84 3.46.12 5.38 1.95c1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26c2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26c-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16c-.07-.28-.18-.57-.29-.86zm-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7c.64-.35.83-1.82.32-3.96c-.77.16-1.58.28-2.4.36c-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16c.07.28.18.57.29.86zm2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a23 23 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9"/></svg>`;
const NODE = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47c1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 0 1-.11-.21V7.71c0-.09.04-.17.11-.21l7.44-4.29c.06-.04.16-.04.22 0l7.44 4.29c.07.04.11.12.11.21v8.58c0 .08-.04.16-.11.21l-7.44 4.29c-.06.04-.16.04-.23 0L10 19.65c-.08-.03-.16-.04-.21-.01c-.53.3-.63.36-1.12.51c-.12.04-.31.11.07.32l2.48 1.47q.36.21.78.21t.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2M14 8c-2.12 0-3.39.89-3.39 2.39c0 1.61 1.26 2.08 3.3 2.28c2.43.24 2.62.6 2.62 1.08c0 .83-.67 1.18-2.23 1.18c-1.98 0-2.4-.49-2.55-1.47a.226.226 0 0 0-.22-.18h-.96c-.12 0-.21.09-.21.22c0 1.24.68 2.74 3.94 2.74c2.35 0 3.7-.93 3.7-2.55c0-1.61-1.08-2.03-3.37-2.34c-2.31-.3-2.54-.46-2.54-1c0-.45.2-1.05 1.91-1.05c1.5 0 2.09.33 2.32 1.36c.02.1.11.17.21.17h.97c.05 0 .11-.02.15-.07c.04-.04.07-.1.05-.16C17.56 8.82 16.38 8 14 8"/></svg>`;
const VUE = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M2 3h3.5L12 15l6.5-12H22L12 21zm4.5 0h3L12 7.58L14.5 3h3L12 13.08z"/></svg>`;
const ANGULAR = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 2.5l8.84 3.15l-1.34 11.7L12 21.5l-7.5-4.15l-1.34-11.7zm0 2.1L6.47 17h2.06l1.11-2.78h4.7L15.45 17h2.05zm1.62 7.9h-3.23L12 8.63z"/></svg>`;
const GITLAB = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m21.94 13.11l-1.05-3.22c0-.03-.01-.06-.02-.09l-2.11-6.48a.86.86 0 0 0-.8-.57c-.36 0-.68.25-.79.58l-2 6.17H8.84L6.83 3.33a.85.85 0 0 0-.79-.58c-.37 0-.69.25-.8.58L3.13 9.82v.01l-1.07 3.28c-.16.5.01 1.04.44 1.34l9.22 6.71c.17.12.39.12.56-.01l9.22-6.7c.43-.3.6-.84.44-1.34M8.15 10.45l2.57 7.91l-6.17-7.91m8.73 7.92l2.47-7.59l.1-.33h3.61l-5.59 7.16m4.1-13.67l1.81 5.56h-3.62m-1.3.95l-1.79 5.51L12 19.24l-2.86-8.79M6.03 3.94L7.84 9.5H4.23m-1.18 4.19c-.09-.07-.13-.19-.09-.29l.79-2.43l5.82 7.45m11.38-4.73l-6.51 4.73l.02-.03l5.79-7.42l.79 2.43c.04.1 0 .22-.09.29"/></svg>`;
const PYTHON = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.14 7.5A2.86 2.86 0 0 1 22 10.36v3.78A2.86 2.86 0 0 1 19.14 17H12c0 .39.32.96.71.96H17v1.68a2.86 2.86 0 0 1-2.86 2.86H9.86A2.86 2.86 0 0 1 7 19.64v-3.75a2.85 2.85 0 0 1 2.86-2.85h5.25a2.85 2.85 0 0 0 2.85-2.86V7.5zm-4.28 11.79c-.4 0-.72.3-.72.89s.32.71.72.71a.71.71 0 0 0 .71-.71c0-.59-.32-.89-.71-.89m-10-1.79A2.86 2.86 0 0 1 2 14.64v-3.78A2.86 2.86 0 0 1 4.86 8H12c0-.39-.32-.96-.71-.96H7V5.36A2.86 2.86 0 0 1 9.86 2.5h4.28A2.86 2.86 0 0 1 17 5.36v3.75a2.85 2.85 0 0 1-2.86 2.85H8.89a2.85 2.85 0 0 0-2.85 2.86v2.68zM9.14 5.71c.4 0 .72-.3.72-.89s-.32-.71-.72-.71c-.39 0-.71.12-.71.71s.32.89.71.89"/></svg>`;
const JAVASCRIPT = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v18H3zm4.73 15.04c.4.85 1.19 1.55 2.54 1.55c1.5 0 2.53-.8 2.53-2.55v-5.78h-1.7V17c0 .86-.35 1.08-.9 1.08c-.58 0-.82-.4-1.09-.87zm5.98-.18c.5.98 1.51 1.73 3.09 1.73c1.6 0 2.8-.83 2.8-2.36c0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02c0-.41.31-.73.81-.73c.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33c-1.51 0-2.48.96-2.48 2.23c0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13c0 .48-.45.83-1.15.83c-.83 0-1.31-.43-1.67-1.03z"/></svg>`;
const TYPESCRIPT = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v18H3zm10.71 14.86c.5.98 1.51 1.73 3.09 1.73c1.6 0 2.8-.83 2.8-2.36c0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02c0-.41.31-.73.81-.73c.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33c-1.51 0-2.48.96-2.48 2.23c0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13c0 .48-.45.83-1.15.83c-.83 0-1.31-.43-1.67-1.03zM13 11.25H8v1.5h1.5V20h1.75v-7.25H13z"/></svg>`;
const SANITY = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.394 7.31a6 6 0 0 1-.833-.68c-.913-.91-1.38-2.067-1.38-3.568v-.575C6.699.929 9.039 0 11.828 0c5.394 0 8.515 2.8 9.285 6.74H16.22c-.54-1.554-1.89-2.764-4.352-2.764c-2.422 0-4.136 1.276-4.473 3.334h-.002ZM4.683 3.062c0 3.236 2.034 5.162 6.106 6.177l4.316.983c3.854.87 6.2 3.03 6.2 6.55a6.6 6.6 0 0 1-1.436 4.239c0-3.511-1.85-5.409-6.31-6.55l-4.236-.946c-3.393-.76-6.011-2.536-6.011-6.36a6.58 6.58 0 0 1 1.37-4.093ZM17.18 16.484c-.292 2.235-2.092 3.495-4.698 3.495c-2.314 0-4.048-.946-4.703-2.99H2.694C3.518 21.44 7.224 24 12.519 24c2.828 0 5.277-.87 6.85-2.439v-.55c0-1.66-.433-2.876-1.342-3.816a5.5 5.5 0 0 0-.847-.71z"/></svg>`;
const JEST = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M22.251 11.82a3.12 3.12 0 0 0-2.328-3.01L22.911 0H8.104L11.1 8.838a3.12 3.12 0 0 0-2.244 2.988a3.12 3.12 0 0 0 1.313 2.536a8.3 8.3 0 0 1-1.084 1.244a8.1 8.1 0 0 1-2.55 1.647c-.834-.563-1.195-1.556-.869-2.446a3.11 3.11 0 0 0-.91-6.08a3.117 3.117 0 0 0-3.113 3.113c0 .848.347 1.626.903 2.182q-.072.144-.146.299c-.465.959-.993 2.043-1.195 3.259c-.403 2.432.257 4.384 1.849 5.489A5.1 5.1 0 0 0 5.999 24c1.827 0 3.682-.917 5.475-1.807c1.279-.632 2.599-1.292 3.898-1.612c.48-.118.98-.187 1.508-.264c1.07-.153 2.175-.312 3.168-.89a4.48 4.48 0 0 0 2.182-3.091c.174-.994 0-1.994-.444-2.87c.298-.48.465-1.042.465-1.647zm-1.355 0c0 .965-.785 1.75-1.75 1.75a1.753 1.753 0 0 1-1.085-3.126l.007-.007q.085-.063.18-.125s.008 0 .008-.007c.028-.014.055-.035.083-.05c.007 0 .014-.006.021-.006q.044-.021.097-.042q.054-.02.098-.041c.007 0 .013-.007.02-.007c.028-.007.056-.021.084-.028c.007 0 .02-.007.028-.007c.034-.007.062-.014.097-.02h.007l.104-.022c.007 0 .02 0 .028-.007c.028 0 .055-.007.083-.007h.035c.035 0 .07-.007.111-.007h.09c.028 0 .05 0 .077.007h.014q.083.009.167.028a1.766 1.766 0 0 1 1.396 1.723zM10.043 1.39h10.93l-2.509 7.4c-.104.02-.208.055-.312.09l-2.64-5.385l-2.648 5.35c-.104-.034-.216-.055-.327-.076zm4.968 9.825a3.1 3.1 0 0 0-.938-1.668l1.438-2.904l1.452 2.967c-.43.43-.743.98-.868 1.605zm-3.481-1.098c.034-.007.062-.014.097-.02h.02c.029-.008.056-.008.084-.015h.028c.028 0 .049-.007.076-.007h.271c.028 0 .049.007.07.007c.014 0 .02 0 .035.007c.027.007.048.007.076.014q.009-.002.028.007l.097.02h.007q.042.01.083.029c.007 0 .014.007.028.007c.021.007.049.014.07.027c.007 0 .014.007.02.007c.028.014.056.021.084.035h.007a.4.4 0 0 1 .09.049h.007c.028.014.056.034.084.048c.007 0 .007.007.013.007c.028.014.05.035.077.049l.007.007c.083.062.16.132.236.201l.007.007a1.75 1.75 0 0 1 .48 1.209a1.752 1.752 0 0 1-3.502 0a1.74 1.74 0 0 1 1.32-1.695m-6.838-.049c.966 0 1.751.786 1.751 1.751s-.785 1.751-1.75 1.751s-1.752-.785-1.752-1.75s.786-1.752 1.751-1.752m16.163 6.025a3.07 3.07 0 0 1-1.508 2.133c-.758.438-1.689.577-2.669.716a17 17 0 0 0-1.64.291c-1.445.355-2.834 1.05-4.182 1.717c-1.724.854-3.35 1.66-4.857 1.66a3.65 3.65 0 0 1-2.154-.688c-1.529-1.056-1.453-3.036-1.272-4.12c.167-1.015.632-1.966 1.077-2.877c.028-.055.049-.104.077-.16q.228.084.479.126c-.264 1.473.486 2.994 1.946 3.745l.264.139l.284-.104c1.216-.431 2.342-1.133 3.336-2.071a9.3 9.3 0 0 0 1.445-1.716c.16.027.32.034.48.034a3.12 3.12 0 0 0 3.008-2.327h1.167a3.11 3.11 0 0 0 3.01 2.327c.576 0 1.11-.16 1.57-.43c.18.52.236 1.063.139 1.605"/></svg>`;
const PLAYWRIGHT = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128"><path fill="currentColor" d="m72.086 86.132l-.594-.144c-13.125-3.844-15.15-14.311-15.15-14.311l18.182 5.082L84.15 39.77l-.116-.031c-11.807-3.162-19.64-8.692-22.744-11.292c-4.4-3.685-6.335-6.246-8.24-2.372c-1.682 3.417-3.836 8.977-5.92 16.762c-4.516 16.857-7.892 52.429 20.027 59.914l.572.129zm-18.807-30.85s4.4-6.843 11.862-4.722c7.467 2.121 8.045 10.376 8.045 10.376zm-8.517 23.451L31.787 82.41s1.41-8.029 10.968-11.212l-7.347-27.573l-.635.193c-9.111 2.457-16.476 1.805-19.55 1.273c-4.357-.751-6.636-1.708-6.422 1.606c.186 2.923.882 7.454 2.477 13.44c3.45 12.961 14.854 37.937 36.405 32.132l.635-.199zM19.548 60.315l15.316-4.035s-.446 5.892-6.188 7.405c-5.743 1.512-9.128-3.371-9.128-3.371zm89.824-18.979c-3.981.698-13.532 1.567-25.336-1.596c-11.807-3.162-19.64-8.692-22.744-11.292c-4.4-3.685-6.335-6.246-8.24-2.372c-1.684 3.417-3.837 8.977-5.921 16.762c-4.516 16.857-7.892 52.429 20.027 59.914c27.912 7.479 42.772-25.017 47.289-41.875c2.084-7.783 2.998-13.676 3.25-17.476c.287-4.305-2.67-3.055-8.324-2.064zM53.28 55.282s4.4-6.843 11.862-4.722c7.467 2.121 8.045 10.376 8.045 10.376zm18.215 30.706c-13.125-3.845-15.15-14.311-15.15-14.311l35.259 9.858c0-.002-7.117 8.25-20.109 4.453m12.466-21.51s4.394-6.838 11.854-4.711c7.46 2.124 8.048 10.379 8.048 10.379zM51.732 83.935v-7.179l-19.945 5.656s1.474-8.563 11.876-11.514c3.155-.894 5.846-.888 8.069-.459V40.995h9.987c-1.087-3.36-2.139-5.947-3.023-7.744c-1.461-2.975-2.96-1.003-6.361 1.842c-2.396 2.001-8.45 6.271-17.561 8.726c-9.111 2.457-16.476 1.805-19.55 1.273c-4.357-.752-6.636-1.708-6.422 1.605c.186 2.923.882 7.455 2.477 13.44c3.45 12.962 14.854 37.937 36.405 32.132c5.629-1.517 9.603-4.515 12.357-8.336h-8.309Zm-32.185-23.62l15.316-4.035s-.446 5.892-6.188 7.405c-5.743 1.512-9.128-3.371-9.128-3.371z"/></svg>`;
const MOCHA = `<svg xmlns="http://www.w3.org/2000/svg" width="0.61em" height="1em" viewBox="0 0 310 512"><path fill="currentColor" d="M183.07 153.302C262.738 94.654 165.275 41.29 183.07 0c-73.318 74.216 2.44 95.303 0 153.302m-59.535 4.466c54.06-40.562-16.164-78.526 0-102.698c-48.117 52.093-.763 57.18 0 102.698m186.046 40.186c0-7.442-5.953-14.884-14.883-14.884H14.884C7.442 183.07 0 189.023 0 197.954c0 50.604 7.442 224.744 81.86 309.58c2.977 2.979 5.954 4.466 10.42 4.466h125.023c4.465 0 7.442-1.488 10.419-4.465c74.418-83.349 81.86-257.489 81.86-309.581m-110.14 270.883h-87.813c-4.465 0-7.442-1.488-10.419-4.465c-50.604-59.535-56.558-178.605-58.046-220.279c0-7.442 5.953-14.884 14.884-14.884h196.465c7.441 0 14.883 5.954 14.883 14.884c0 41.674-7.442 159.256-58.046 220.28c-4.465 2.976-7.442 4.464-11.907 4.464m46.14-138.418c-5.953 40.186-17.86 86.325-43.162 116.093c-2.977 2.976-5.954 4.465-8.93 4.465h-74.42c-2.976 0-7.441-1.488-8.93-4.465c-17.86-22.326-29.767-52.093-37.209-83.35c77.212 9.986 156.606 2.312 172.651-32.743"/></svg>`;
const HYPERLEDGER = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 24 24"><path d="M16.593 1.008 5.725 2.067a.671.671 0 0 0-.688-.585.72.72 0 0 0-.71.71c0 .256.14.455.326.58L.106 12.636l-.047.044c-.06.06-.059.06-.059.12 0 0 0 .058.059.058l6.338 8.974a.716.716 0 0 0-.175.449c0 .415.355.71.71.71a.68.68 0 0 0 .705-.666l10.66-1.04.132.048a.226.226 0 0 0 .052-.065c.037-.004.068-.014.068-.054l4.55-9.876c.062.018.125.039.19.039.356 0 .711-.355.711-.71a.72.72 0 0 0-.71-.713.693.693 0 0 0-.263.054L16.71 1.067c-.06-.06-.06-.06-.118-.06zm-.522.28-4.952 2.711-5.434-1.598a.962.962 0 0 0 .045-.15zm.404.016 1.36 5.907-3.115-1.933a.944.944 0 0 0 .154-.36.72.72 0 0 0-.71-.71.71.71 0 0 0-.667.49l-2.07-.608zm.272.244 6.062 8.607c-.03.028-.052.06-.076.093l-4.676-2.9zm-11.094.944 5.339 1.577-3.644 1.995-1.876-3.339a.802.802 0 0 0 .18-.233zm-.38.363L7.118 6.14l.012.059-2.093 1.917V2.903a.625.625 0 0 0 .236-.048zm-.43.01c.044.014.09.023.135.027v5.28L.561 12.22zm6.456 1.295 2.176.643c-.008.039-.024.076-.024.115 0 .166.067.304.158.42l-2.53 2.188-3.564-1.278zm2.339 1.22a.72.72 0 0 0 .525.25c.022 0 .043-.005.065-.008l.625 3.257-3.723-1.334zm.999.018 3.245 2.017.64 2.779-3.598-1.29-.62-3.295a.71.71 0 0 0 .333-.211zM7.407 6.4l3.527 1.251-2.803 2.424zm-.22.088.748 3.756-2.38 2.056a.705.705 0 0 0-.518-.211V8.457zm10.916 1.065 4.545 2.826c-.015.033-.022.066-.032.1l-3.917-.285zm-7.118.117 3.902 1.384.707 3.69-3.077 2.64-3.584-1.238-.793-4.023zm-6.007.84v3.585a.72.72 0 0 0-.652.705.72.72 0 0 0 .711.711c.03 0 .056-.013.085-.017l.407 2.147-5.174-2.9zm9.98.568 3.471 1.233-2.79 2.394zm-7.014 1.214.752 3.772-3.015-1.041a.955.955 0 0 0 .067-.223.708.708 0 0 0-.17-.466zm10.78.14 3.858.283a.67.67 0 0 0 .117.321l-4.068 3.644zm-.181.138-.095 4.273-1.566 1.403a.72.72 0 0 0-.468-.186c-.05 0-.093.017-.14.025l-.576-3.068zm4.273.618c.026.024.059.037.088.057l-4.407 9.576.13-5.94zm-7.162 1.866.582 3.038a.654.654 0 0 0-.483.412l-2.932-1.014zm-10.008.055 3.07 1.062.73 3.664-3.838-2.15-.427-2.204a.713.713 0 0 0 .465-.372zm-5.123.012 5.07 2.85 1.075 5.653c-.03.013-.054.034-.081.05zm8.43 1.132 3.482 1.202-2.775 2.382zm9.491.788-.133 5.997-5.669-2.02 3.198-1.855a.72.72 0 0 0 .574.32.722.722 0 0 0 .712-.713.676.676 0 0 0-.162-.426zm-5.704.519 2.996 1.035c-.013.058-.032.112-.032.175 0 .11.028.21.071.301L12.5 18.967l-2.633-.937zm-7.069.456 3.786 2.13-2.213 3.493a.687.687 0 0 0-.492-.043zm3.984 2.217 2.553.903-4.706 2.723c-.025-.035-.047-.073-.08-.103zm2.697.954 5.533 1.955-10.274.957c-.011-.047-.022-.094-.042-.137z"/></svg>`;
const CYPRESS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.998 0C5.366 0 0 5.367 0 12a11.992 11.992 0 0 0 12 12c6.633 0 12-5.367 12-12-.001-6.633-5.412-12-12.002-12zM6.37 14.575c.392.523.916.742 1.657.742.35 0 .699-.044 1.004-.175.306-.13.655-.306 1.09-.567l1.223 1.745c-1.003.83-2.138 1.222-3.447 1.222-1.048 0-1.92-.218-2.705-.654a4.393 4.393 0 0 1-1.746-1.92c-.392-.83-.611-1.79-.611-2.925 0-1.09.219-2.094.61-2.923a4.623 4.623 0 0 1 1.748-2.007c.741-.48 1.657-.698 2.661-.698.699 0 1.353.087 1.877.305a5.64 5.64 0 0 1 1.614.96l-1.222 1.658A4.786 4.786 0 0 0 9.12 8.77c-.305-.13-.698-.174-1.048-.174-1.483 0-2.225 1.134-2.225 3.446-.043 1.18.175 2.008.524 2.532H6.37zm12 2.705c-.436 1.353-1.091 2.357-2.008 3.098-.916.743-2.138 1.135-3.665 1.266l-.305-2.05c1.003-.132 1.745-.35 2.225-.7.174-.13.524-.523.524-.523L11.519 6.764h3.01l2.095 8.683 2.226-8.683h2.923z"/></svg>`;
const DOCKER = `<svg xmlns="http://www.w3.org/2000/svg" width="2269" height="2500" viewBox="-0.557 117.607 598.543 423.631"><path d="M592.162 277.804c-1.664-1.37-16.642-12.597-48.815-12.597-8.321 0-16.92.822-25.24 2.191-6.102-41.898-41.327-62.162-42.714-63.257l-8.598-4.93-5.547 7.942c-6.934 10.68-12.204 22.729-15.255 35.052-5.824 23.824-2.219 46.279 9.985 65.447-14.7 8.216-38.553 10.133-43.545 10.406H18.58c-10.262 0-18.583 8.216-18.583 18.348-.554 33.956 5.27 67.912 17.197 99.951 13.59 35.052 33.838 61.067 59.91 76.95 29.4 17.799 77.383 27.931 131.468 27.931 24.408 0 48.815-2.19 72.946-6.572 33.56-6.025 65.734-17.526 95.412-34.23a260.485 260.485 0 0 0 64.902-52.577c31.342-34.778 49.925-73.663 63.515-108.167h5.547c34.116 0 55.195-13.418 66.844-24.92 7.766-7.12 13.59-15.882 17.751-25.74l2.497-7.12z"/><path d="M55.193 306.83h52.698c2.497 0 4.716-1.916 4.716-4.654v-46.553c0-2.465-1.942-4.655-4.716-4.655H55.193c-2.496 0-4.715 1.916-4.715 4.655v46.553c.277 2.738 2.219 4.655 4.715 4.655zm72.668 0h52.699c2.496 0 4.715-1.916 4.715-4.654v-46.553c0-2.465-1.942-4.655-4.715-4.655h-52.7c-2.496 0-4.715 1.916-4.715 4.655v46.553c.278 2.738 2.22 4.655 4.715 4.655m74.055 0h52.699c2.496 0 4.715-1.917 4.715-4.655v-46.553c0-2.465-1.942-4.655-4.715-4.655h-52.699c-2.496 0-4.715 1.916-4.715 4.655v46.553c0 2.738 1.942 4.655 4.715 4.655zm72.946 0h52.699c2.496 0 4.715-1.917 4.715-4.655v-46.553c0-2.465-1.942-4.655-4.715-4.655h-52.699c-2.496 0-4.715 1.916-4.715 4.655v46.553c0 2.738 2.219 4.655 4.715 4.655zm-147-66.543h52.698c2.496 0 4.715-2.19 4.715-4.655V189.08c0-2.465-1.942-4.656-4.715-4.656H127.86c-2.496 0-4.715 1.917-4.715 4.656v46.553c.278 2.464 2.22 4.655 4.715 4.655m74.055 0h52.699c2.496 0 4.715-2.19 4.715-4.655V189.08c0-2.465-1.942-4.656-4.715-4.656h-52.699c-2.496 0-4.715 1.917-4.715 4.656v46.553c0 2.464 1.942 4.655 4.715 4.655m72.946 0h52.699c2.496 0 4.715-2.19 4.715-4.655V189.08c0-2.465-2.22-4.656-4.715-4.656h-52.699c-2.496 0-4.715 1.917-4.715 4.656v46.553c0 2.464 2.219 4.655 4.715 4.655m0-66.817h52.699c2.496 0 4.715-1.917 4.715-4.655v-46.553c0-2.465-2.22-4.656-4.715-4.656h-52.699c-2.496 0-4.715 1.917-4.715 4.656v46.553c0 2.464 2.219 4.655 4.715 4.655m73.5 133.36h52.699c2.496 0 4.715-1.917 4.715-4.655v-46.553c0-2.465-1.941-4.655-4.715-4.655h-52.698c-2.497 0-4.716 1.916-4.716 4.655v46.553c.278 2.738 2.22 4.655 4.716 4.655"/></svg>`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'delphinerichard.github.io';
  lang: AvailableLang = 'fr';

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    translate: TranslateService
  ) {
    const isHeadless = navigator.webdriver;
    const browserLang = translate.getBrowserLang();
    if (browserLang === 'en' && !isHeadless) {
      translate.setDefaultLang('en');
      translate.use('en');
    }

    if (isHeadless) {
      const htmlTag = document.getElementsByTagName('html')[0];
      const langAttr = htmlTag.getAttribute('lang');
      if (langAttr && langAttr !== this.lang) {
        translate.use(langAttr);
      }
    }

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang as AvailableLang;
    });

    iconRegistry.addSvgIconLiteral(
      'email',
      sanitizer.bypassSecurityTrustHtml(AT_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'linkedin',
      sanitizer.bypassSecurityTrustHtml(LINKEDIN_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'github',
      sanitizer.bypassSecurityTrustHtml(GITHUB_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'french',
      sanitizer.bypassSecurityTrustHtml(FRENCH_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'uk',
      sanitizer.bypassSecurityTrustHtml(UK_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'nest',
      sanitizer.bypassSecurityTrustHtml(NEST)
    );
    iconRegistry.addSvgIconLiteral(
      'react',
      sanitizer.bypassSecurityTrustHtml(REACT)
    );
    iconRegistry.addSvgIconLiteral(
      'node',
      sanitizer.bypassSecurityTrustHtml(NODE)
    );
    iconRegistry.addSvgIconLiteral(
      'vue',
      sanitizer.bypassSecurityTrustHtml(VUE)
    );
    iconRegistry.addSvgIconLiteral(
      'angular',
      sanitizer.bypassSecurityTrustHtml(ANGULAR)
    );
    iconRegistry.addSvgIconLiteral(
      'gitlab',
      sanitizer.bypassSecurityTrustHtml(GITLAB)
    );
    iconRegistry.addSvgIconLiteral(
      'python',
      sanitizer.bypassSecurityTrustHtml(PYTHON)
    );
    iconRegistry.addSvgIconLiteral(
      'javascript',
      sanitizer.bypassSecurityTrustHtml(JAVASCRIPT)
    );
    iconRegistry.addSvgIconLiteral(
      'typescript',
      sanitizer.bypassSecurityTrustHtml(TYPESCRIPT)
    );
    iconRegistry.addSvgIconLiteral(
      'sanity',
      sanitizer.bypassSecurityTrustHtml(SANITY)
    );
    iconRegistry.addSvgIconLiteral(
      'jest',
      sanitizer.bypassSecurityTrustHtml(JEST)
    );
    iconRegistry.addSvgIconLiteral(
      'playwright',
      sanitizer.bypassSecurityTrustHtml(PLAYWRIGHT)
    );
    iconRegistry.addSvgIconLiteral(
      'mocha',
      sanitizer.bypassSecurityTrustHtml(MOCHA)
    );
    iconRegistry.addSvgIconLiteral(
      'hyperledger',
      sanitizer.bypassSecurityTrustHtml(HYPERLEDGER)
    );
    iconRegistry.addSvgIconLiteral(
      'cypress',
      sanitizer.bypassSecurityTrustHtml(CYPRESS)
    );
    iconRegistry.addSvgIconLiteral(
      'docker',
      sanitizer.bypassSecurityTrustHtml(DOCKER)
    );
  }
}
