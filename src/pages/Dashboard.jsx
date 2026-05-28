import { useEffect, useState } from "react"


export default function Dashboard() {

    const [sheetData, setSheetData] = useState([])

    const [selectedEmployee, setSelectedEmployee] = useState("GORVIND")

    useEffect(() => {

  fetch(
    `https://sheetdb.io/api/v1/c8d5dl34662cz?sheet=${selectedEmployee}`
  )
    .then((res) => res.json())
    .then((data) => {

      console.log(data)

      setSheetData(data)

    })

}, [selectedEmployee])

    const employees = [
        "GORVIND",
        "TUSHAR",
        "SRISHTI",
        "AKSHAT",
        "KHUSHBOO",
        "TANYA",
        "VIJAY",
        "GAGAN"
    ]

    // const sheetData = selectedEmployee === "ALL"

    //     ? sheetData

    //     : sheetData.filter(
    //         (item) =>
    //             item["Assigned To"] === selectedEmployee
    //     )

    /* =========================
        DYNAMIC CALCULATIONS
    ========================= */

    const totalTasks = sheetData.length

    const pendingTasks = sheetData.filter(
        (item) =>
            item.Status?.toLowerCase() === "pending"
    ).length

    const completedTasks = sheetData.filter(
        (item) =>
            item.Status?.toLowerCase() === "completed"
    ).length

    const inProgressTasks = sheetData.filter(
        (item) =>
            item.Status?.toLowerCase() === "in progress"
    ).length

    const cancelledTasks = sheetData.filter(
        (item) =>
            item.Status?.toLowerCase() === "cancelled"
    ).length

    /* =========================
        EMPLOYEE PERFORMANCE
    ========================= */

    const employeeMap = {}

    sheetData.forEach((task) => {

        const employee = task["Assigned To"]

        if (!employee) return

        if (!employeeMap[employee]) {

            employeeMap[employee] = 0

        }

        if (
            task.Status?.toLowerCase() === "completed"
        ) {

            employeeMap[employee] += 1

        }

    })

    const performance = Object.keys(employeeMap).map((name) => ({

        name,
        value: employeeMap[name]

    }))

    // const sheetData = selectedEmployee === "ALL"

    //     ? sheetData

    //     : sheetData.filter(
    //         (item) =>
    //             item["Assigned To"] === selectedEmployee
    //     )

    /* =========================
        STATS CARDS
    ========================= */

    const stats = [

        {
            title: "TOTAL TASKS",
            value: totalTasks,
            color: "#2563eb",
            subtitle: "All assigned tasks"
        },

        {
            title: "PENDING",
            value: pendingTasks,
            color: "#f59e0b",
            subtitle: "Tasks awaiting action"
        },

        {
            title: "COMPLETED",
            value: completedTasks,
            color: "#10b981",
            subtitle: "Tasks completed"
        },

        {
            title: "IN PROGRESS",
            value: inProgressTasks,
            color: "#ef4444",
            subtitle: "Tasks currently active"
        }

    ]

    return (

        <div
            style={{
                display: "flex",
                background: "#f1f5f9",
                minHeight: "100vh",
                fontFamily: "Inter, Arial"
            }}
        >

            {/* SIDEBAR */}

            <div
                style={{
                    width: "250px",
                    background: "#071226",
                    color: "white",
                    padding: "24px 18px",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >

                <div>

                    <h1
                        style={{
                            fontSize: "24px",
                            lineHeight: "1.3",
                            marginBottom: "50px",
                            fontWeight: "800",
                            marginTop: "10px"
                        }}
                    >
                        STAFF WORK
                        <br />
                        MANAGEMENT
                    </h1>

                    {
                        ["Dashboard", "Tasks", "Calendar", "Employees", "Reports", "Settings"].map((item, index) => (

                            <div
                                key={index}
                                style={{
                                    padding: "16px 18px",
                                    borderRadius: "16px",
                                    marginBottom: "12px",
                                    background: index === 0 ? "#2563eb" : "transparent",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "600"
                                }}
                            >
                                {item}
                            </div>

                        ))
                    }

                </div>

                <div
                    style={{
                        padding: "18px",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "18px"
                    }}
                >

                    <p
                        style={{
                            marginBottom: "10px",
                            color: "#94a3b8",
                            fontSize: "13px",
                            fontWeight: "600"
                        }}
                    >
                        SELECT EMPLOYEE
                    </p>

                    <select

                        value={selectedEmployee}

                        onChange={(e) =>
                            setSelectedEmployee(e.target.value)
                        }

                        style={{
                            width: "100%",
                            background: "#0f172a",
                            color: "white",
                            border: "1px solid rgba(255,255,255,0.1)",
                            padding: "14px",
                            borderRadius: "12px",
                            fontSize: "15px",
                            outline: "none"
                        }}
                    >

                        {
                            employees.map((employee, index) => (

                                <option
                                    key={index}
                                    value={employee}
                                >
                                    {employee}
                                </option>

                            ))
                        }

                    </select>

                </div>

            </div>

            {/* MAIN */}

            <div
                style={{
                    marginLeft: "250px",
                    width: "100%",
                    padding: "24px"
                }}
            >

                {/* TOPBAR */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "28px"
                    }}
                >

                    <div>

                        <h1
                            style={{
                                fontSize: "20px",
                                color: "#0f172a",
                                margin: 0,
                                fontWeight: "700"
                            }}
                        >
                            STAFF WORK MANAGEMENT DASHBOARD
                        </h1>

                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "18px"
                        }}
                    >

                        <input
                            type="date"
                            style={topBox}
                        />

                    </div>

                </div>

                {/* STATS */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4,1fr)",
                        gap: "20px"
                    }}
                >

                    {
                        stats.map((item, index) => (

                            <div
                                key={index}
                                style={cardStyle}
                            >

                                <div
                                    style={{
                                        width: "64px",
                                        height: "64px",
                                        borderRadius: "50%",
                                        background: item.color,
                                        marginBottom: "20px",
                                        boxShadow: `0 10px 25px ${item.color}40`
                                    }}
                                />

                                <p
                                    style={{
                                        color: "#0f172a",
                                        fontSize: "15px",
                                        fontWeight: "700",
                                        marginBottom: "8px"
                                    }}
                                >
                                    {item.title}
                                </p>

                                <h1
                                    style={{
                                        fontSize: "30px",
                                        color: item.color,
                                        margin: "0 0 8px 0",
                                        fontWeight: "700"
                                    }}
                                >
                                    {item.value}
                                </h1>

                                <p
                                    style={{
                                        color: "#94a3b8",
                                        fontSize: "14px"
                                    }}
                                >
                                    {item.subtitle}
                                </p>

                            </div>

                        ))
                    }

                </div>

                {/* CHARTS */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px",
                        marginTop: "24px"
                    }}
                >

                    {/* PIE CHART */}

                    <div style={chartCard}>

                        <h2 style={chartTitle}>
                            TASK STATUS OVERVIEW
                        </h2>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: "30px"
                            }}
                        >

                            <div
                                style={{
                                    width: "260px",
                                    height: "260px",
                                    borderRadius: "50%",
                                    background:
                                        `conic-gradient(
                      #2563eb 0deg ${(pendingTasks / totalTasks) * 360}deg,
                      #f59e0b ${(pendingTasks / totalTasks) * 360}deg ${((pendingTasks + inProgressTasks) / totalTasks) * 360}deg,
                      #10b981 ${((pendingTasks + inProgressTasks) / totalTasks) * 360}deg ${((pendingTasks + inProgressTasks + completedTasks) / totalTasks) * 360}deg,
                      #ef4444 ${((pendingTasks + inProgressTasks + completedTasks) / totalTasks) * 360}deg 360deg
                    )`,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >

                                <div
                                    style={{
                                        width: "110px",
                                        height: "110px",
                                        background: "white",
                                        borderRadius: "50%"
                                    }}
                                />

                            </div>

                            <div>

                                <Legend color="#2563eb" title="Pending" value={pendingTasks} />
                                <Legend color="#f59e0b" title="In Progress" value={inProgressTasks} />
                                <Legend color="#10b981" title="Completed" value={completedTasks} />
                                <Legend color="#ef4444" title="Cancelled" value={cancelledTasks} />

                            </div>

                        </div>

                    </div>

                    {/* PERFORMANCE */}

                    <div style={chartCard}>

                        <h2 style={chartTitle}>
                            TEAM PERFORMANCE
                        </h2>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "space-between",
                                height: "300px",
                                marginTop: "40px"
                            }}
                        >

                            {
                                performance.map((item, index) => (

                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: "10px"
                                        }}
                                    >

                                        <div
                                            style={{
                                                width: "28px",
                                                height: `${item.value * 35}px`,
                                                background: "#3b82f6",
                                                borderRadius: "10px 10px 0 0"
                                            }}
                                        />

                                        <span
                                            style={{
                                                fontSize: "12px",
                                                color: "#475569",
                                                fontWeight: "600"
                                            }}
                                        >
                                            {item.name}
                                        </span>

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                </div>

                {/* TABLE */}

                <div
                    style={{
                        background: "white",
                        borderRadius: "24px",
                        padding: "24px",
                        marginTop: "24px",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.04)"
                    }}
                >

                    <h2
                        style={{
                            marginBottom: "20px",
                            color: "#0f172a",
                            fontSize: "20px"
                        }}
                    >
                        STAFF TASKS
                    </h2>

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >

                        <thead>

                            <tr
                                style={{
                                    background: "#f8fafc",
                                    textAlign: "left"
                                }}
                            >

                                <th style={thStyle}>Task No</th>
                                <th style={thStyle}>Task Name</th>
                                <th style={thStyle}>Description</th>
                                <th style={thStyle}>Assigned To</th>
                                <th style={thStyle}>Due Date</th>
                                <th style={thStyle}>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                sheetData.map((item, index) => (

                                    <tr key={index}>

                                        <td style={tdStyle}>
                                            {item["Task No"]}
                                        </td>

                                        <td style={tdStyle}>
                                            {item["Task Name"]}
                                        </td>

                                        <td style={tdStyle}>
                                            {item["Discriptions"]}
                                        </td>

                                        <td style={tdStyle}>
                                            {item["Assigned To"]}
                                        </td>

                                        <td style={tdStyle}>
                                            {item["Due Date"]}
                                        </td>

                                        <td style={tdStyle}>

                                            <span
                                                style={{
                                                    padding: "8px 14px",
                                                    borderRadius: "30px",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    background:
                                                        item.Status === "Completed"
                                                            ? "#dcfce7"
                                                            : item.Status === "Pending"
                                                                ? "#fef3c7"
                                                                : "#dbeafe",

                                                    color:
                                                        item.Status === "Completed"
                                                            ? "#15803d"
                                                            : item.Status === "Pending"
                                                                ? "#b45309"
                                                                : "#1d4ed8"
                                                }}
                                            >
                                                {item.Status}
                                            </span>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    )

}

function Legend({ color, title, value }) {

    return (

        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "24px"
            }}
        >

            <div
                style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: color
                }}
            />

            <div>

                <h3
                    style={{
                        margin: 0,
                        color: "#0f172a",
                        fontSize: "16px"
                    }}
                >
                    {title}
                </h3>

                <p
                    style={{
                        marginTop: "4px",
                        color: "#94a3b8",
                        fontSize: "13px"
                    }}
                >
                    {value} Tasks
                </p>

            </div>

        </div>

    )

}

const topBox = {

    background: "white",
    border: "1px solid #e2e8f0",
    padding: "14px 18px",
    borderRadius: "14px",
    fontSize: "15px",
    outline: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)"

}

const cardStyle = {

    background: "white",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.04)"

}

const chartCard = {

    background: "white",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.04)"

}

const chartTitle = {

    fontSize: "20px",
    color: "#0f172a",
    margin: 0,
    fontWeight: "800"

}

const thStyle = {

    padding: "14px",
    fontSize: "14px",
    color: "#64748b",
    borderBottom: "1px solid #e2e8f0"

}

const tdStyle = {

    padding: "16px 14px",
    fontSize: "14px",
    color: "#0f172a",
    borderBottom: "1px solid #f1f5f9"

}