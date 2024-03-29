Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    relations: {
        '../grid-item/index': {
            type: 'child',
            linked(target) {
                this.initGrids();

            },
            unlinked(target) {
                this.initGrids();
            }
        },

    },
    externalClasses: ['l-class', 'l-class-grid'],
    properties: {
        rowNum: {
            type: String,
            value: 3,
        },
        showBorder: Boolean,
        showColBorder: Boolean,
        showRowBorder: Boolean,
    },
    data: {
        gridItems: [],
        childNum: 0,
        currentIndex: null,
    },
    ready() {
        this.initGrids();
    },

    lifetimes: {
        show() {

        },
    },
    methods: {
        initGrids() {
            let items = this.getRelationNodes('../grid-item/index');
            if (this.data.childNum === items.length) return;
            const gridItems = items.map((item,index) => {
                item.setData({
                    index,
                })
                return {
                    key: item.data.key,
                    cell: item.data.cell
                }
            });
            this.setData({
                gridItems: gridItems,
                childNum: items.length
            })
        },
    }
});