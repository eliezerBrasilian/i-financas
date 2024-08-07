package com.ifinancas.screens.welcomeLogin

import android.util.Log
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Button
import androidx.compose.material.Icon
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.frajola.patches.google_sign_in.rememberGoogleSignUp
import com.ifinancas.R
import com.ifinancas.data.dataclass.FirebaseUserResponse
import com.ifinancas.data.gitignore.clientId
import com.ifinancas.navigation.ArrowBackTop
import com.ifinancas.navigation.NavigationScreens
import com.ifinancas.ui.components.GoogleAuthButton
import com.ifinancas.ui.viewModel.AuthViewModel
import com.ifinancas.ui.viewModel.UserViewModel
import com.ifinancas.utils.AppUtils
import com.ifinancas.utils.Toast
import kotlinx.coroutines.launch


@Composable
fun WelcomeSignUp(
    nav: NavHostController = rememberNavController(),
    authViewModel: AuthViewModel,
    userViewModel: UserViewModel
) {
    val isLoading by authViewModel.loading.observeAsState(initial = false)

    val scope = rememberCoroutineScope()

    val onSuccess: (user: FirebaseUserResponse) -> Unit = { user ->
        scope.launch {
            Log.d(AppUtils.AppTag, "useruid: ${user.uid}")
            userViewModel.saveEmail(user.email)
            userViewModel.saveUid(user.uid)
            userViewModel.saveName(user.name)
            user.profilePicture?.let { userViewModel.savePhoto(it) }

            nav.navigate("appNavigation") {
                popUpTo("authNavigation") {
                    inclusive = true
                }
            }
        }
    }

    val context = LocalContext.current

    val onClickGoogleSignIn = rememberGoogleSignUp(
        clientId = clientId,
        context = LocalContext.current,
        onSuccess = { result ->
            authViewModel.loginWithGoogle(
                email = result.email!!,
                name = result.displayName!!,
                userUid = result.id!!,
                photo = result.photoUrl,
                onError = {},
                onSuccess = onSuccess
            )
        },
        onError = {
            Toast(context).showToast("Falha ao logar com Google ❌")
        }
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .padding(15.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        ArrowBackTop(nav = nav)
        Spacer(modifier = Modifier.height(40.dp))

        Image(
            painter = painterResource(id = R.drawable.casual_life_email_marketing),
            contentDescription = null,
            modifier = Modifier
                .height(200.dp)
                .width(200.dp)
        )
        Spacer(modifier = Modifier.height(40.dp))
        Text(
            text = "Olá financeiro, vamos começar!",
            color = Color.Black,
            fontWeight = FontWeight.Bold,
            fontSize = 18.sp,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )
        Text(
            text = "Crie a sua conta e comece a transformar suas finanças",
            color = Color.DarkGray,
            fontWeight = FontWeight.Medium,
            fontSize = 15.sp,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(50.dp))
        Button(
            onClick = { nav.navigate(NavigationScreens.SIGN_UP) }, modifier = Modifier
                .fillMaxWidth()
                .height(50.dp)
                .border(width = 1.dp, color = Color.Blue, shape = RoundedCornerShape(9.dp))
        ) {
            Icon(imageVector = Icons.Default.Email, contentDescription = null)
            Spacer(modifier = Modifier.width(10.dp))
            Text(
                text = "Cadastrar com email",
                color = Color.White,
                fontWeight = FontWeight.Medium,
                fontSize = 13.sp
            )
        }
        Spacer(modifier = Modifier.height(15.dp))
       /* GoogleAuthButton(
            text = "Cadastrar com Google",
            isLoading = isLoading,
            onClick = onClickGoogleSignIn
        )
        Spacer(modifier = Modifier.height(15.dp))*/

        /*Text(
            text = "Já sou cadastrado",
            color = Color.Blue,
            fontWeight = FontWeight.Medium,
            fontSize = 13.sp, modifier = Modifier.clickable {
                nav.navigate(NavigationScreens.LOGIN)
            }
        )*/
    }
}
