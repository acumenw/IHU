<%@ include file="/Pages/Dashboards/ModeratorDashboard.jsp" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>MODERATOR </title>
    </head>
    <body>
        <br>
        <br>
        <form action="SaveCategory" method="post">
            Category name:<input type="text" name="categoryName" required>
            <input type="submit" value="Create">
        </form>
    </body>
</html>
