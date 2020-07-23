import React, {Component} from 'react';
import { Card, Avatar } from 'antd';
import { EditOutlined,SettingOutlined,HeartOutlined,LikeOutlined} from '@ant-design/icons';

class CardDetail extends Component {

    render() {
        const { Meta } = Card;
        return (
            <div className="sight">
                <Card
                    style={{ width: 1000 }}
                    cover={
                        <img
                            alt="example"
                            src="https://tr-osdcp.qunarzz.com/tr-osd-tr-space/img/5ceaccaa9f7ac404e4fc365042ba3e0f.jpg_r_720x480x95_0528bdbb.jpg"
                        />
                    }
                    actions={[
                        <LikeOutlined key="like"/>,
                        <HeartOutlined key="plan"/>

                    ]}
                >
                    <Meta
                        title="波士顿公园"
                        description="这里公园系统是美国迄今为止最为完善、占地面积最大的公园，东起于波士顿公园，西至富兰克林公园，绵延16公里长，囊括了9个公园，被当地波士顿人称为“翡翠项链”（Emerald Necklace）。

"
                    />
                </Card>
            </div>
        );
    }
}

export default CardDetail;