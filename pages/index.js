import useSWR from "swr";
import Add from "../Component/Add";
import Edit from "../Component/Edit";
import { useState } from "react";
import View from "../Component/View";
import Delete from "../Component/Delete";
import { useRouter } from "next/router";
const Home = () => {
  const router = useRouter();
  const [editValue, setValue] = useState("");
  const [type, setType] = useState("");
  const [active, setActive] = useState(false);
  const [id, setId] = useState(0);
  const [editId, setEditId] = useState(0);
  const [spec, setSpec] = useState({});
  const [delId, setDelId] = useState(0);
  const [totalChannels, setTotal] = useState(0);
  const fetcher = async (url) => {
    const issue = await fetch(url);
    const result = await issue.json();
    setTotal(result.length);
    return result;
  };
  const { data, error } = useSWR("/api/channel/get", fetcher);
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  // get the specific data
  const single = async () => {
    try {
      const req = await fetch(`/api/channel/get/${editId}`);
      if (req.ok) {
        const res = await req.json();
        setSpec(res);
      } else {
        throw new Error(req.statusText);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <p style={{ position: "absolute", top: 0, right: 30, fontSize: "4rem" }}>
        {totalChannels}
      </p>
      <div style={{ overflowY: "scroll", height: "400px" }}>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Subscribers</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            {data.map((channel) => {
              return (
                <tr key={channel.id}>
                  <td
                    onDoubleClick={() => {
                      setValue(channel.subcribers);
                      setType("text");
                      setActive(true);
                      setId(channel.id);
                    }}
                  >
                    {channel.name}
                  </td>
                  <td
                    onDoubleClick={() => {
                      setValue(channel.subcribers);
                      setType("number");
                      setActive(true);
                      setId(channel.id);
                    }}
                  >
                    {channel.subcribers}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setEditId(channel.id);
                        single();
                      }}
                      style={{ marginRight: "2px" }}
                    >
                      View
                    </button>
                    <button
                      onClick={async () => {
                        await fetch(`/api/channel/delete/${channel.id}`, {
                          method: "DELETE",
                        });
                        router.reload();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Add />
      <Edit
        valueEdit={editValue}
        type={type}
        active={active}
        id={id}
        changeStat={setActive}
      />
      <View user={spec} />
      <Delete id={delId} />
    </div>
  );
};
export default Home;
// export const getStaticProps = async () => {
//   let result;
//   let error;
//   try {
//     const data = await Channel.findAll();
//     console.log(data);
//     result = data;
//   } catch (e) {
//     console.log(e);
//     error = e;
//   }

//   return {
//     props: {
//       result: {result},
//       error: {error},
//     },
//   };
// };
