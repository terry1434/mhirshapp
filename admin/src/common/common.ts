

//生成el-cascader-panel需要的数据格式
//参考:https://element.eleme.cn/#/zh-CN/component/cascader
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
    //注意：由于三层嵌套都是在操作引用类型变量，所以
    //数组使用.slice(0)的技巧，生成副本再赋值
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

export function resetCascaderOrginById(orgin: any): Array<any> {
    let temp: any = {};
    let count: number = 0;
    let first = orgin.data.data[0];
    let dtRow = 0;
    let lev3 = [{ id: dtRow++, value: first.ken2, label: first.ken2, ctlType: first.ctlType, level: 3 }];
    let lev2 = [
        { id: dtRow++, value: first.ken1, label: first.ken1, children: lev3.slice(0), level: 2 }
    ];
    let lev1 = {
        id: dtRow++,
        value: first.kbnName,
        label: first.kbnName,
        children: lev2.slice(0),
        level: 1
    };
    temp[count] = lev1;

    //将已经排序的数据转换成级联节点格式
    //注意：由于三层嵌套都是在操作引用类型变量，所以
    //数组使用.slice(0)的技巧，生成副本再赋值
    //参考:https://element.eleme.cn/#/zh-CN/component/cascader
    orgin.data.data.forEach((item: any, index: number, array: any) => {
        if (index > 0) {
            if (
                array[index - 1].kbnName == item.kbnName &&
                array[index - 1].ken1 == item.ken1
            ) {
                lev3.push({ id: dtRow++, value: item.ken2, label: item.ken2, ctlType: item.ctlType, level: 3 });
                lev2 = temp[count].children;
                lev2[lev2.length - 1].children = lev3.slice(0);
                temp[count].children = lev2.slice(0);
            } else if (array[index - 1].kbnName == item.kbnName) {
                lev3 = [{ id: dtRow++, value: item.ken2, label: item.ken2, ctlType: item.ctlType, level: 3 }];
                lev2.push({
                    id: dtRow++,
                    value: item.ken1,
                    label: item.ken1,
                    children: lev3.slice(0),
                    level: 2
                });
                temp[count].children = lev2.slice(0);
            } else {
                lev3 = [{ id: dtRow++, value: item.ken2, label: item.ken2, ctlType: item.ctlType, level: 3 }];
                lev2 = [
                    { id: dtRow++, value: item.ken1, label: item.ken1, children: lev3.slice(0), level: 2 }
                ];
                lev1 = {
                    id: dtRow++,
                    value: item.kbnName,
                    label: item.kbnName,
                    children: lev2.slice(0),
                    level: 1
                };
                temp[++count] = lev1;
            }
        }
    });
    temp.length = count + 1;
    return Array.from(temp);
}

//多了一个level属性
export function resetCascaderOrginTree(orgin: any): Array<any> {
    let temp: any = {};
    let count: number = 0;
    let first = orgin.data.data[0];
    let lev3 = [{ value: first.ken2, label: first.ken2, level: 3 }];
    let lev2 = [
        { value: first.ken1, label: first.ken1, children: lev3.slice(0), level: 2 }
    ];
    let lev1 = {
        value: first.kbnName,
        label: first.kbnName,
        children: lev2.slice(0),
        level: 1
    };
    temp[count] = lev1;

    //将已经排序的数据转换成级联节点格式
    //注意：由于三层嵌套都是在操作引用类型变量，所以
    //数组使用.slice(0)的技巧，生成副本再赋值
    //参考:https://element.eleme.cn/#/zh-CN/component/cascader
    orgin.data.data.forEach((item: any, index: number, array: any) => {
        if (index > 0) {
            if (
                array[index - 1].kbnName == item.kbnName &&
                array[index - 1].ken1 == item.ken1
            ) {
                lev3.push({ value: item.ken2, label: item.ken2, level: 3 });
                lev2 = temp[count].children;
                lev2[lev2.length - 1].children = lev3.slice(0);
                temp[count].children = lev2.slice(0);
            } else if (array[index - 1].kbnName == item.kbnName) {
                lev3 = [{ value: item.ken2, label: item.ken2, level: 3 }];
                lev2.push({
                    value: item.ken1,
                    label: item.ken1,
                    children: lev3.slice(0),
                    level: 2
                });
                temp[count].children = lev2.slice(0);
            } else {
                lev3 = [{ value: item.ken2, label: item.ken2, level: 3 }];
                lev2 = [
                    { value: item.ken1, label: item.ken1, children: lev3.slice(0), level: 2 }
                ];
                lev1 = {
                    value: item.kbnName,
                    label: item.kbnName,
                    children: lev2.slice(0),
                    level: 1
                };
                temp[++count] = lev1;
            }
        }
    });
    temp.length = count + 1;
    return Array.from(temp);
}


//将级联数组中Level3的已选中节点的disable变成true
export function disableCascaderOrginTree(treeNode: any, disflg: boolean) {
    // console.log("treeNode", treeNode)

    //设定Level_3层级元素的disabled=true
    if (treeNode.length && treeNode.length > 0) {
        treeNode.forEach((item: any) => {
            if (item.data.children) {
                disableCascaderOrginTree(item, disflg);
            }
            else {
                //没有children属性的节点为最后一层（第三层）
                item.data.disabled = disflg;
                //判断二级目录是否设定disabled
                const level2Disabled = item.parent.children.every((child: any) => {
                    return child.data.disabled == disflg
                })
                if (level2Disabled) {
                    item.parent.data.disabled = disflg;
                    //判断一级目录是否设定disabled
                    const level1Disabled = item.parent.parent.children.every((child: any) => {
                        return child.data.disabled == disflg
                    })
                    if (level1Disabled) {
                        item.parent.parent.data.disabled = disflg;
                    }
                }
            }
        })
    } else {
        if (!treeNode.data.children) {
            treeNode.data.disabled = disflg;
        }
    }
}

//画面中选择删除项目后，还原Cascader的项目可选状态
//delItem:['业务1','业务2','业务3'] 画面中选择的删除行
//itemsNode:[{value:xxx,label:xxx,children:xxx},{},{},...] 级联菜单中的数据
export function clearDisableCascader(delItem: any, itemsNode: any) {
    itemsNode.forEach((item: any) => {
        if (item.children) {
            //父节点
            if (item.value == delItem[0]) {
                item.disabled = false;
                delItem.shift();
                clearDisableCascader(delItem, item.children)
            }
        } else if (item.value == delItem[0]) {
            item.disabled = false;
        }
    })
}
