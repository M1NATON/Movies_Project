import React, { useState } from "react"
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import Login from "../components/Login"
import Register from "../components/Register"

const Auth = () => {

  const [selected, setSelected] = useState<string>("login")

  return (
    <div className={"flex items-center justify-center h-screen"}>
      <div className="flex flex-col ">
        <Card className={"max-w-full w-[340px] h-[450px]"}>
          <CardBody className={"overflow-hidden"}>
            <Tabs
              fullWidth={true}
              size={"md"}
              selectedKey={selected}
              onSelectionChange={key => setSelected(key as string)}
            >
              <Tab key="login" title={"Вход"}>
                <Login setSelected={setSelected} />
              </Tab>

              <Tab key="sign-up" title={"Регистрация"}>
                <Register setSelected={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Auth