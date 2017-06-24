import cheerio from 'cheerio-without-node-native';
import guid from '../utils/guid';

export default function detailParser(html) {
    let $ = cheerio.load(html);
    let data = [];
    let imagesArr = [];

    $('.entry-content img').each(function () {
        var url = $(this).attr('src');
        imagesArr.push({
            url
        });
    });

    $('.entry-content > *').each(function () {

        /**
         * type: Number
         * -1: default
         * 0: hr分割线
         * 1: 正常图片和文字
         * 2: 重口图片和文字
         * 3: 下载信息
         * 4: 可跳转地址
         */

        let item = {
            content: '',
            imageUrl: '',
            originalUrl: '',
            type: -1,
            key: guid()
        };
        if ($(this).is('p') || $(this).is('.toggle')) {
            item.content = $(this).text().trim();
            if ($(this).has('img').length) {
                item.imageUrl = $(this).find('img').attr('src');
            }
            item.type = 1;

            if (item.content.indexOf('原帖') > -1) {
                item.content = '';
            }
            data.push(item);

        } else if ($(this).is('hr')) {
            item.type = 0;
            data.push(item);
        } else if ($(this).is('.toggle-box')) {
            $(this).find('p').each(function () {
                let item = {
                    content: '',
                    imageUrl: '',
                    type: -1,
                    key: guid()
                };
                item.content = $(this).text().trim();
                if ($(this).has('img').length) {
                    item.imageUrl = $(this).find('img').attr('src');
                }
                item.type = 2;
                data.push(item);
            });
        } else if ($(this).is('pre')) {
            item.content = $(this).text().trim().replace(/传送门/g, '');
            item.type = 3;
            data.push(item);

        }
    });

    $('.entry-content a').each(function () {
        let item = {
            content: '',
            imageUrl: '',
            originalUrl: '',
            type: -1,
            key: data.length
        };

        item.content = $(this).text().trim();
        item.originalUrl = $(this).attr('href').trim();
        item.type = 4;
        data.push(item);
    });

    return {
        data,
        imagesArr
    };
}