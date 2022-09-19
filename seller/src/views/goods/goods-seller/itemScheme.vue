<template>
    <div class="item-scheme">
        <Card>
            <img src="test.png"/>
            <!-- 放方案列表 -->
        <Table
        class="mt_10"
        :loading="loading"
        border
        :columns="columns"
        :data="data"
        ref="table"
      > 
      </Table>
        </Card>
        <Modal v-model="showDetail" width="60">
          <p slot="header">
            <span>方案详情</span>
          </p>
          <div class="order-log-div">
            <Table
              :loading="showLoading"
              border
              :columns="componentColumns"
              :data="componentData"
              ref="table"
            ></Table>
          </div>

      <div slot="footer" style="text-align: right">
        <Button @click="showDetail = false">取消</Button>
      </div>
    </Modal>
    </div>
</template>
<script>
import { getItemSchemeList, getSchemeDetail} from '@/api/schemes'

export default {
   name:"item-scheme",
   data(){
    return{
    id: this.$route.query.id, // 项目id
    loading: true, // 表单加载状态
    showDetail:false,
    showLoading:false,
    searchForm:{
      pageNumber: 1, // 当前页数
      pageSize: 10, // 页面大小
    },
    componentColumns:[
        {
          title: "零件名称",
          key: "componentName",
          width: 100,
          tooltip: true,
        },
        {
          title: "零件单价",
          key: "componentUnitPrice",
          width: 200,
          tooltip: true,
        },
        {
          title: "零件个数",
          key: "componentNumber",
          width: 200,
          tooltip: true,
        },
    ],
    columns: [
        {
          title: "方案编号",
          key: "schemeId",
          width: 300,
          tooltip: true,
        },
        {
          title: "方案详情",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    // type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.showSchemeDetail(params.row);
                    },
                  },
                },
                "详情"
              ),])
          }
        },
        {
          title: "方案状态",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    // type: "info",
                    size: "small",
                  },
                  attrs: {
                    disabled:
                        (params.row.checkFlag=== 1
                          )

                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.checkScheme(params.row);
                    },
                  },
                },
                "通过"
              ),])
          }
        },
 
      ],
      data: [], // 表单数据
      componentData:[],//方案零件数据
      componentTotal:0,
      total: 0, // 表单数据总数
    }
   },
   methods:{
    //初始化所有方案数据
    init() {
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      //看项目有没有生成方案
      this.searchForm.itemId=this.id
      getItemSchemeList(this.searchForm).then((res) => {
        this.loading = false;
        if (res.result.records.length==0) {
          setItemScheme(this.id).then((Res)=>{
            console.log(Res)
            this.searchForm.itemId='' 
            this.getDataList()
          })
        }else{
          this.data = res.result.records;
          this.total = res.result.total;
        }
      });
    },
    //展示方案详情
    showSchemeDetail(v){ 
      this.searchForm.schemeId=v.schemeId
      this.showLoading=true
      getSchemeDetail(this.searchForm).then((res)=>{
        this.showLoading=false
        console.log('scheme')
        console.log(this.searchForm)
        if(res.success){
          this.componentData = res.result.records
          this.showDetail=true
          this.searchForm.schemeId=''
        }
      })

    },
    //确认方案
    checkScheme(v){
      this.searchForm.schemeId=v.schemeId
      let sum=0
      getSchemeDetail(this.searchForm).then((res)=>{
        if(res.success){
          res.result.records.forEach(item=>{
            sum=Number(item.componentUnitPrice)*Number(item.componentNumber)+sum
          })
          }
        })

      //再更新item_scheme表
      
    }
  },
   mounted() {
    this.init();
  },
  mounted() {
    this.init();
  },
}
</script>
