export function resetCascaderOrgin(orgin: any) {
    let temp: any = {};
    let count: number = 0;
    let first = orgin.data.data[0];
    let lev3 = [{ value: first.ken2, label: first.ken2 }];
    let lev2 = [
        { value: first.ken1, label: first.ken1, children: lev3.slice(0) }
    ];
    let lev1 = {
        value: first.kbnName,
        label: first.kbnName,
        children: lev2.slice(0)
    };
    temp[count] = lev1;

    //将已经排序的数据转换成级联节点格式
    //参考:https://element.eleme.cn/#/zh-CN/component/cascader
    orgin.data.data.forEach((item: any, index: number, array: any) => {
        if (index > 0) {
            if (
                array[index - 1].kbnName == item.kbnName &&
                array[index - 1].ken1 == item.ken1
            ) {
                lev3.push({ value: item.ken2, label: item.ken2 });
                lev2 = temp[count].children;
                lev2[lev2.length - 1].children = lev3.slice(0);
                temp[count].children = lev2.slice(0);
            } else if (array[index - 1].kbnName == item.kbnName) {
                lev3 = [{ value: item.ken2, label: item.ken2 }];
                lev2.push({
                    value: item.ken1,
                    label: item.ken1,
                    children: lev3.slice(0)
                });
                temp[count].children = lev2.slice(0);
            } else {
                lev3 = [{ value: item.ken2, label: item.ken2 }];
                lev2 = [
                    { value: item.ken1, label: item.ken1, children: lev3.slice(0) }
                ];
                lev1 = {
                    value: item.kbnName,
                    label: item.kbnName,
                    children: lev2.slice(0)
                };
                temp[++count] = lev1;
            }
        }
    });
    temp.length = count + 1;
    return Array.from(temp);
}