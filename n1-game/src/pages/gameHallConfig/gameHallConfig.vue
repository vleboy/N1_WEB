<template>
  <div class="p-gameHall">

    <Button type="primary" class="-top-btn" @click="openModal()">创建游戏资源</Button>

    <Table :columns="columns" :data="gameItems"></Table>

    <Spin size="large" fix v-if="isFetching">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>

    <Modal title="编辑游戏配置" v-model="isOpenModal" class="p-gameHall">
      <Form :model="gameHallInfo" :label-width="140">
        <FormItem label="游戏名称">
          <Select v-model="gameHallInfo.businessKey" placeholder="请选择" clearable style="width: 100%">
            <Option v-for="(item, index) in gameList" :key="index" :label="item.gameName"
                       :value="item.kindId"></Option>
          </Select>
        </FormItem>
        <FormItem label="视频链接(阿里云)">
          <Input v-model="gameHallInfo.urlAli" auto-complete="off" placeholder="请输入正确视频链接 例（http://www.xxxx.com）"
                    :maxlength="500"></Input>
        </FormItem>
        <FormItem label="视频链接(亚马逊)">
          <Input v-model="gameHallInfo.url" auto-complete="off" placeholder="请输入正确视频链接 例（http://www.xxxx.com）"
                    :maxlength="500"></Input>
        </FormItem>
        <FormItem label="推荐排序">
          <Input v-model="gameHallInfo.sort" auto-complete="off" placeholder="请输入需要推荐的顺序" :maxlength="20"></Input>
        </FormItem>
        <FormItem label="是否推荐">
          <RadioGroup v-model="isRecommend">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="状态" >
          <RadioGroup v-model="gameHallInfo.state">
            <Radio label="0">无</Radio>
            <Radio label="1">最新</Radio>
            <Radio label="2">最热</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="推荐图片">
          <Upload
            :action="AliUrl"
            ref="upload"
            :before-upload="beforeUploadThree"
            :file-list="fileListThree"
            :show-file-list="false">
            <Button icon="ios-cloud-upload-outline" :loading="loadingStatusThree">请选择需要上传文件</Button>
          </Upload>
          <div style="padding: 16px 0">只能上传一张jpg/png文件，且不超过2M</div>
          <div v-if="gameHallInfo.recommendImg" style="overflow: hidden">
            <img style="width: 80%" :src="gameHallInfo.recommendImg">
          </div>
        </FormItem>
        <FormItem label="背景图片">
          <Upload
            :action="AliUrl"
            ref="upload"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :show-file-list="false">
            <Button icon="ios-cloud-upload-outline" :loading="loadingStatusOne">请选择需要上传文件</Button>
          </Upload>
          <div style="padding: 16px 0">只能上传一张jpg/png文件，且不超过2M</div>
          <div v-if="gameHallInfo.bgImg" style="overflow: hidden">
            <img style="width: 80%" :src="gameHallInfo.bgImg">
          </div>
        </FormItem>
        <FormItem label="轮播图片">
          <Upload
            :action="AliUrl"
            list-type="picture-card"
            ref="upload"
            :before-upload="beforeUploadTwo"
            :file-list="fileListTwo"
            :show-file-list="false">
            <Button icon="ios-cloud-upload-outline" :loading="loadingStatusTwo">请选择需要上传文件</Button>
          </Upload>
          <div style="padding: 16px 0">只能上传最多四张jpg/png文件，且不超过1M</div>
          <div class="-img-list">
            <div v-for="(item,index) of fileListTwo" class="-img-item">
              <img :src="item.url">
              <img class="-icon" src="/static/del.png" @click="delImg(index)">
            </div>
          </div>

        </FormItem>
      </Form>
      <div slot="footer" class="dialog-footer">
        <Button @click="isOpenModal = false">取 消</Button>
        <Button type="primary" :load="isSending" @click="submitProp(gameHallInfo.adId)">{{isSending ? '提交中' : '确 定'}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import { httpRequest } from "@/service/index";

  export default {
    created() {
      this.getGameHallList()
      this.getGameList()
    },
    data() {
      return {
        AliUrl: 'http://app.risheng3d.com',
        gameList: [],
        gameItems: [],
        fileList: [],
        uploadAction: [],
        imgFile: {},
        fileListTwo: [],
        fileListTwoAli: [],
        uploadActionTwo: [],
        imgFileTwo: {},
        fileListThree: [],
        uploadActionThree: [],
        imgFileThree: {},
        gameHallInfo: {},
        isOpenModal: false,
        loadingStatusThree: false,
        loadingStatusTwo: false,
        loadingStatusOne: false,
        isSending: false,
        isFetching: false,
        gameType: {
          '10000': '棋牌游戏',
          '30000': '真人视讯',
          '40000': '电子游戏',
          '50000': '街机游戏'
        },
        gameStatus: {
          '0': '正常',
          '1': '最新',
          '2': '最热'
        },
        columns: [
          {
            title: '游戏名称',
            key: 'gameName'
          },
          {
            title: '游戏类别',
            render: (h, params) => {
              return h('span', this.gameType[params.row.gameType])
            }
          },
          {
            title: '推荐图片',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.recommendImg
                },
                style: {
                  width: '40px',
                  height: '40px'
                }
              })
            }
          },
          {
            title: '背景图片',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.bgImg
                },
                style: {
                  width: '40px',
                  height: '40px'
                }
              })
            }
          },
          // {
          //   title: '轮播图片',
          //   render: (h, params) => {
          //     return h('div',[
          //       h('img', {
          //       attrs: {
          //         src: params.row.bgImg
          //       },
          //       style: {
          //         width: '40px',
          //         height: '40px'
          //       }
          //     })
          //     ])
          //   }
          // },
          {
            title: '状态',
            render: (h, params) => {
              return h(
                "Tag",
                {
                  props: {
                    type: "border",
                    color: params.row.state ? "green" : "red"
                  }
                }, this.gameStatus[params.row.state])
            }
          },
          {
            title: '推荐',
            render: (h, params) => {
              return h('span', params.row.isRecommend ? '是' : '否')
            }
          },
          {
            title: '推荐排序',
            key: 'sort'
          },
          {
            title: '视频链接(阿里云)',
            key: 'urlAli'
          },
          {
            title: '视频链接(亚马逊)',
            key: 'url'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color:'#20a0ff',
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.changeRecommend(params.row)
                    }
                  }
                }, params.row.isRecommend ? '取消推荐':'推荐'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color:'#20a0ff'
                  },
                  on: {
                    click: () => {
                      this.openModal(params.row)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color:'#20a0ff'
                  },
                  on: {
                    click: () => {
                      this.delGame(params.row.businessKey)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        isRecommend: ''
      }
    },
    methods: {
      getGameHallList() {
        this.isFetching = true
        httpRequest('post', '/configMultList', {
          code: 'lobbyconfig'
        },'admin').then(res => {
          this.gameItems = res.payload
          }).finally(()=>{
          this.isFetching = false
        })
      },
      getGameList() {
        httpRequest('post', '/gameList', {
          query: {
            companyIden: "NA"
          }
        },'game')
          .then(res => {
            this.gameList = res.payload
          })
      },
      delGame(id) {
        this.$Modal.confirm({
          title: "提示!",
          content: '确认要删除该游戏配置吗?',
          onOk: () => {
            httpRequest("post", "/configMultDel", {
              code: 'lobbyconfig',
              businessKey: id
            },'admin').then(() => {
              this.$Message.success("删除成功");
              this.getGameHallList()
            });
          }
        });
      },
      openModal(item) {
        this.isOpenModal = true
        this.isSending = false
        this.fileList = []
        this.fileListTwo = []
        this.fileListThree = []
        if (item) {
          this.gameHallInfo = JSON.parse(JSON.stringify(item))
          this.gameHallInfo.url = this.gameHallInfo.url === 'NULL!' ? '' : this.gameHallInfo.url
          this.gameHallInfo.urlAli = this.gameHallInfo.urlAli === 'NULL!' ? '' : this.gameHallInfo.urlAli
          this.isRecommend = this.gameHallInfo.isRecommend ? '1' : '0'
          this.fileList.push({
            name: '',
            url: this.gameHallInfo.bgImg
          })
          this.fileListThree.push({
            name: '',
            url: this.gameHallInfo.recommendImg
          })
          this.fileListTwo = this.gameHallInfo.carouselImg || []
          this.fileListTwoAli = this.gameHallInfo.carouselImgAli || []
          if (!this.fileListTwo.length) { // 处理某一方上传时候未上传成功导致不一致情况
            this.fileListTwoAli = []
          }
        } else {
          this.gameHallInfo = {
            businessKey: '',
            bgImg: '',
            bgImgAli: '',
            recommendImg: '',
            recommendImgAli: '',
            carouselImg: [],
            carouselImgAli: [],
            isRecommend: false,
            state: 0
          }
        }
      },
      changeRecommend(item) {
        let array = []
        for (let data of this.gameItems) {
          if (data.isRecommend) {
            array.push(data)
          }
        }
        if ((array.length >= 12) && !item.isRecommend) {
          return this.$Message.error('游戏推荐不能超过12个')
        } else {
          this.submitProp(item)
        }
      },
      submitProp(item) {

        if (item) {
          this.gameHallInfo = JSON.parse(JSON.stringify(item))
          this.gameHallInfo.isRecommend = !this.gameHallInfo.isRecommend
        } else {
          if (this.gameHallInfo.url == 'NULL!') this.gameHallInfo.url = '';
          if (this.gameHallInfo.urlAli == 'NULL!') this.gameHallInfo.urlAli = '';

          if (!this.gameHallInfo.businessKey) {
            return this.$Message.error('请选择游戏')
          }

          this.gameHallInfo.code = 'lobbyconfig'

          this.gameHallInfo.carouselImg = this.fileListTwo

          this.gameHallInfo.carouselImgAli = this.fileListTwoAli

          this.gameHallInfo.isRecommend = this.isRecommend == 1

          this.gameHallInfo.sort = this.gameHallInfo.sort != '' ? Number(this.gameHallInfo.sort) : ''

          for (let item of this.gameList) {
            if (item.kindId == this.gameHallInfo.businessKey) {
              Object.assign(this.gameHallInfo, item)
            }
          }
        }

        if (this.isSending) return // 防止重复提交
        this.isSending = true
        httpRequest("post",
          "/configMultNew",
          this.gameHallInfo,
          'admin').then(() => {
            this.$Message.success("操作成功");
            this.isOpenModal = false
            this.fileListTwoAli = []
            this.fileListTwo = []
            this.getGameHallList()
          }
        ).finally(()=>{
          this.isSending = false
        })
      },

      // 背景图
      beforeUpload(file) {
        let fileName = this.suffixFun(file.name)
        const isLt1M = file.size / 1024 / 1024 < 1
        const suffix = fileName[1].toLowerCase()
        const fileType = ['png', 'jpg']
        this.imgFile = file
        this.imgFile.fileName = `${fileName[0] + new Date().getTime()}.${fileName[1]}`
        return new Promise((resolve, reject) => {
          this.loadingStatusOne = true
          if (!(fileType.indexOf(suffix) > -1)) {
            this.loadingStatusOne = false
            this.$Message.error('上传图片只能是 JPG或者PNG 格式!')
            reject(false)
          } else if (!isLt1M) {
            this.loadingStatusOne = false
            this.$Mssage.error('大小不能超过 1MB!')
            reject(false)
          }

          httpRequest('post','/upload', {
            contentType: 'image',
            filePath: this.imgFile.fileName
          },'admin').then(res => {
            this.uploadAction = res.payload
            this.uploadAli()
            this.uploadAws()
            resolve(true)
          }).catch(err => {
            this.loadingStatusOne = false
            // console.log(err)
            reject(false)
          })
        })
      }, // 上传前的检验 格式、大小等
      uploadAli() {
        localStorage.setItem("nowUrl", 'gameHallConfig');
        let mi = new OSS.Wrapper({
          region: 'oss-cn-hangzhou',
          accessKeyId: this.uploadAction[1].ali.AccessKeyId,
          accessKeySecret: this.uploadAction[1].ali.AccessKeySecret,
          stsToken: this.uploadAction[1].ali.SecurityToken,
          bucket: 'assetdownload'
        })
        let suffix = this.suffixFun(this.imgFile.name)
        let date = new Date().getTime()
        let fileName = `image/${suffix[0] + date}.${suffix[1]}`
        mi.multipartUpload(fileName, this.imgFile, {}).then((results) => {
          this.$Message.success('阿里云上传成功')
          this.loadingStatusOne = false
          this.gameHallInfo.bgImgAli = `${this.AliUrl}/${results.name}` || results.url

        }).catch((err) => {
          this.loadingStatusOne = false
          console.log(err);
        });
      },
      uploadAws() {
        const dev = `https://s3-ap-southeast-1.amazonaws.com/image-na-dev/${this.imgFile.fileName}` //测试环境
        const prod = `http://img.na77.com/${this.imgFile.fileName}` //开发环境
        httpRequest('put',`${this.uploadAction[0].aws}`, this.imgFile)
          .then(res => {
            this.$Message.success('亚马逊上传成功')
            this.gameHallInfo.bgImg = (process.env.NODE_ENV == 'development') ? dev : prod
        }).finally(()=>{
          this.loadingStatusOne = false
        })
      },

      // 轮播图
      beforeUploadTwo(file) {
        let fileName = this.suffixFun(file.name)
        const isLt1M = file.size / 1024 / 1024 < 1
        const suffix = fileName[1].toLowerCase()
        const fileType = ['png', 'jpg']
        if (this.fileListTwo.length > 3) {
          this.loadingStatusTwo = false
          return this.$Message.error('最多上传四张轮播图片')
        }
        this.imgFileTwo = file
        this.imgFileTwo.fileName = `${fileName[0] + new Date().getTime()}.${fileName[1]}`
        return new Promise((resolve, reject) => {
          this.loadingStatusTwo = true
          if (!(fileType.indexOf(suffix) > -1)) {
            this.loadingStatusTwo = false
            this.$Message.error('上传图片只能是 JPG或者PNG 格式!')
            reject(false)
          } else if (!isLt1M) {
            this.loadingStatusTwo = false
            this.$Message.error('大小不能超过 1MB!')
            reject(false)
          }

          httpRequest('post','/upload', {
            contentType: 'image',
            filePath: this.imgFileTwo.fileName
          },'admin').then(res => {
            this.uploadActionTwo = res.payload
            this.uploadAliTwo()
            this.uploadAwsTwo()
            resolve(true)
          }).catch(err => {
            this.loadingStatusTwo = false
            reject(false)
          })
        })
      }, // 上传前的检验 格式、大小等
      uploadAliTwo() {
        localStorage.setItem("nowUrl", 'gameHallConfig');
        let mi = new OSS.Wrapper({
          region: 'oss-cn-hangzhou',
          accessKeyId: this.uploadActionTwo[1].ali.AccessKeyId,
          accessKeySecret: this.uploadActionTwo[1].ali.AccessKeySecret,
          stsToken: this.uploadActionTwo[1].ali.SecurityToken,
          bucket: 'assetdownload'
        })
//      console.log(this.imgFileTwo.name)
        let suffix = this.suffixFun(this.imgFileTwo.name)
        let date = new Date().getTime()
        let fileName = `image/${suffix[0] + date}.${suffix[1]}`
        mi.multipartUpload(fileName, this.imgFileTwo, {}).then((results) => {
          this.$Message.success('阿里云上传成功')
          this.loadingStatusTwo = false
//        this.gameHallInfo.fileListTwoAli = results.url || `${this.AliUrl}/${results.name}`
          this.fileListTwoAli.push({
            name: results.name,
            url: `${this.AliUrl}/${results.name}` || results.url
          })
        }).catch((err) => {
          this.loadingStatusTwo = false
          console.log(err);
        });
      },
      uploadAwsTwo() {
        const dev = `https://s3-ap-southeast-1.amazonaws.com/image-na-dev/${this.imgFileTwo.fileName}` //测试环境
        const prod = `http://img.na77.com/${this.imgFileTwo.fileName}` //开发环境
        httpRequest('put',`${this.uploadActionTwo[0].aws}`, this.imgFileTwo)
          .then(res => {
          this.loadingStatusTwo = false
          this.$Message.success('亚马孙上传成功')
          this.fileListTwo.push({
            name: this.imgFileTwo.fileName,
            url: (process.env.NODE_ENV == 'development') ? dev : prod
          })
        })
      },
      delImg(id) {
        this.fileListTwo.splice(id, 1)
        this.fileListTwoAli.splice(id, 1)
      },

      // 推荐图
      beforeUploadThree(file) {
        let fileName = this.suffixFun(file.name)
        const isLt1M = file.size / 1024 / 1024 < 1
        const suffix = fileName[1].toLowerCase()
        const fileType = ['png', 'jpg']
        this.imgFileThree = file
        this.imgFileThree.fileName = `${fileName[0] + new Date().getTime()}.${fileName[1]}`
        return new Promise((resolve, reject) => {
          this.loadingStatusThree = true
          if (!(fileType.indexOf(suffix) > -1)) {
            this.loadingStatusThree = false
            this.$Message.error('上传图片只能是 JPG或者PNG 格式!')
            reject(false)
          } else if (!isLt1M) {
            this.loadingStatusThree = false
            this.$Message.error('大小不能超过 1MB!')
            reject(false)
          }

          httpRequest('post','/upload', {
            contentType: 'image',
            filePath: this.imgFileThree.fileName
          },'admin').then(res => {
            this.uploadActionThree = res.payload
            this.uploadAliThree()
            this.uploadAwsThree()
            resolve(true)
          }).finally(() => {
            this.loadingStatusThree = false
            reject(false)
          })
        })
      }, // 上传前的检验 格式、大小等
      uploadAliThree() {
        localStorage.setItem("nowUrl", 'gameHallConfig');
        let mi = new OSS.Wrapper({
          region: 'oss-cn-hangzhou',
          accessKeyId: this.uploadActionThree[1].ali.AccessKeyId,
          accessKeySecret: this.uploadActionThree[1].ali.AccessKeySecret,
          stsToken: this.uploadActionThree[1].ali.SecurityToken,
          bucket: 'assetdownload'
        })
//      console.log(this.imgFileThree.name)
        let suffix = this.suffixFun(this.imgFileThree.name)
        let date = new Date().getTime()
        let fileName = `image/${suffix[0] + date}.${suffix[1]}`
        mi.multipartUpload(fileName, this.imgFileThree, {}).then((results) => {
          this.$Message.success('阿里云上传成功')
          this.loadingStatusThree = false
          this.gameHallInfo.recommendImgAli = `${this.AliUrl}/${results.name}` || results.url
        }).catch((err) => {
          this.loadingStatusThree = false
          console.log(err);
        });
      },
      uploadAwsThree() {
        const dev = `https://s3-ap-southeast-1.amazonaws.com/image-na-dev/${this.imgFileThree.fileName}` //测试环境
        const prod = `http://img.na77.com/${this.imgFileThree.fileName}` //开发环境
        httpRequest('put',`${this.uploadActionThree[0].aws}`, this.imgFileThree)
          .then(res => {
            this.$Message.success('亚马逊上传成功')
            this.gameHallInfo.recommendImg = (process.env.NODE_ENV == 'development') ? dev : prod
        }).finally(()=>{
          this.loadingStatus = false
        })
      },

      suffixFun(o) {
        let arr = o.split('.')
        return arr
      } // 截取文件名的后缀
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/less" lang="less">
  .p-gameHall {
    min-height: 89vh;

    .-top-btn {
      margin-bottom: 1rem
    }

    .-img-list {
      display: flex;

      img {
        width: 100%;
      }

      .-icon {
        position: absolute;
        top: 0;
        right: 0;
        width: 10%;
        cursor: pointer;
      }
    }

    .-img-item {
      padding: 10px;
      width: 25%;
      overflow: hidden;
      position: relative;
    }

    .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
    }
  }
</style>
