/* Copyright (c) 2021-2022 SnailDOS */

import { ICON_DOWNLOAD_PAGE } from "./icons";

export const getIconByExtension = (ext?: string) => {

  switch (ext) {
    case 'py': return 'https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/file_type_python.svg';
    case 'mpy': return 'https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/file_type_python.svg';
    
    case 'zip': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/zip.svg';

    case 'html': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/html.svg';
    case 'htm': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/html.svg';
    case 'tpl': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/html.svg';

    case 'css': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/css.svg';
    case 'scss': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/sass.svg';    
    case 'sass': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/sass.svg';    

    case 'pdf': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/pdf.svg';

    case 'exe': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/exe.svg';
    case 'sh': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/exe.svg';
    case 'bat': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/exe.svg';

    case 'js': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/javascript.svg';
    case 'ts': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/typescript.svg';
    case 'jsx': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/react_ts.svg';

    case 'md': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/markdown.svg';
    case 'mdx': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/mdx.svg';
    case 'rts': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/markdown.svg';

    case 'img': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'png': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'jpg': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'gif': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'dng': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'webp': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'jps': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'jpeg': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'jpe': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'psd': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'ras': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'sgi': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'wpg': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'xpm': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'xcf': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'pixon': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'pict': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'pfm': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'pnm': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';
    case 'rw3': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/image.svg';

    case 'svg': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/svg.svg';

    case 'cc': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/cpp.svg';
    case 'cpp': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/cpp.svg';
    case 'c++': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/cpp.svg';

    case 'cs': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/csharp.svg';

    case 'c': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/c.svg';

    case 'mp4': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'avi': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'mov': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'mkv': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case '3gp': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'asf': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'flv': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'f4v': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'm2ts': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'm2v': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'm4v': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'mjpeg': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'mpg': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'mpeg': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'mpg': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'mxf': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'ogv': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'rm': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'swf': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'vob': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'webm': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';
    case 'wtv': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/video.svg';

    case 'java': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/java.svg';

    case 'go': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/go.svg';

    case 'h': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/h.svg';

    case 'rb': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/ruby.svg';

    case 'sql': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/database.svg';
    case 'db': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/database.svg';

    case 'yaml': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/yalm.svg';
    case 'xml': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/xml.svg';
    case 'xaml': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/xmal.svg';
    case 'json': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/json.svg';

    case 'mp3': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'mp2': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'wav': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'ogg': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case '8svx': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'aac': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'ac3': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'aiff': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'amb': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'au': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'avr': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'cdda': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'caf': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'cvsd': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'cvu': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'dts': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'dvms': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'fap': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'flac': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'fssd': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'gsrt': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'hcom': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'htk': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'ima': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'ircam': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'm4a': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'm4r': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'maud': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'nist': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'oga': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'ogg': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'opus': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'wma': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'wv': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'wve': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'voc': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'txw': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'tta': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'spx': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'sph': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';
    case 'w64': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/audio.svg';

    case 'ttf': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/font.svg';
    case 'woff': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/font.svg';
    case 'otf': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/font.svg';
    case 'dfont': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/font.svg';
    case 'otf': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/font.svg';
    case 'pfb': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/font.svg';
    case 'ps': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/font.svg';
    case 'sfd': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/font.svg';
    case 'cff': return 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/font.svg';

    default: return ICON_DOWNLOAD_PAGE;
  }
}
