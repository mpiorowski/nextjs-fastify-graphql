import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment, faPenAlt, fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, List, Row, Skeleton } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { apiFindAllCategories } from './@common/forumApis';
import { CategoryDrawer } from './CategoryDrawer';

export const CategoryList = () => {
  const { data } = useQuery('categories', () => apiFindAllCategories());
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  library.add(fas, faPenAlt);

  return (
    <div>
      <Button onClick={() => setDrawerVisibility(true)}>Dodaj kategorię</Button>
      <div className={'cat-header'}>Kategorie</div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(category) => (
          <List.Item key={category.title}>
            <Skeleton title={false} loading={false} active>
              <Row gutter={16} justify="space-between" style={{ width: '100%' }} align="middle">
                <Col span={14} style={{ marginLeft: 0 }}>
                  <List.Item.Meta
                    title={
                      <div style={{ fontSize: 18 }} className={'cat-topic-header'}>
                        {/* <FontAwesomeIcon icon={category.icon as IconProp} className={"cat-topic-icon"} /> */}
                        <Link href={'/forum/categories/' + category.uid + '/topics'}>{category.title}</Link>
                      </div>
                    }
                    description={<div>{category.description}</div>}
                  />
                </Col>

                <Col span={6}>
                  <Col span={24}>
                    <FontAwesomeIcon icon={'pencil-alt'} /> {category.topicsNumber || 0} tematy
                  </Col>
                  <Col span={24}>
                    <FontAwesomeIcon icon={faComment} /> {category.postsNumber || 0} postów
                  </Col>
                </Col>

                <Col span={4}>
                  {category.latestPostDate ? (
                    <span style={{ fontSize: 12 }}>
                      {/* <NavLink
                        to={
                          "/forum/categories/" +
                          category.uid +
                          "/topics/" +
                          category.latestTopicUid +
                          "/posts?latest=" +
                          category.latestPostUid
                        }
                      >
                        {moment(category.latestPostDate).fromNow()}
                      </NavLink>{" "} */}
                      w temacie:
                      <div className={'category-latest truncate'} style={{ fontSize: 12 }}>
                        {/* {htmlToText.fromString(category.latestTopic, { uppercaseHeadings: false })} */}
                      </div>
                    </span>
                  ) : (
                    'Brak postów'
                  )}
                </Col>
              </Row>
            </Skeleton>
          </List.Item>
        )}
      />
      <CategoryDrawer drawerVisibility={drawerVisibility} setDrawerVisibility={setDrawerVisibility}></CategoryDrawer>
    </div>
  );
};
