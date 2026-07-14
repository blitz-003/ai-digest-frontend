@echo off
echo Creating folder structure...

:: Step 7 - Base Folder Structure
mkdir src\app
mkdir src\components\layout
mkdir src\components\ui
mkdir src\components\cards
mkdir src\components\feedback
mkdir src\hooks
mkdir src\services
mkdir src\lib
mkdir src\types
mkdir src\utils
mkdir src\constants
mkdir src\styles

:: Step 8 - Feature Structure (Looping through all features)
set features=auth articles categories comments bookmarks likes payments profile subscriptions

for %%f in (%features%) do (
    mkdir src\features\%%f\components
    mkdir src\features\%%f\hooks
    mkdir src\features\%%f\services
    mkdir src\features\%%f\types
    mkdir src\features\%%f\validation
)

:: Step 9 - Create Shared Components (Creating placeholder files)
:: Layout
type nul > src\components\layout\Navbar.tsx
type nul > src\components\layout\Footer.tsx
type nul > src\components\layout\Container.tsx
type nul > src\components\layout\ProfileSidebar.tsx

:: Cards
type nul > src\components\cards\ArticleCard.tsx
type nul > src\components\cards\CategoryCard.tsx
type nul > src\components\cards\StatCard.tsx

:: Feedback
type nul > src\components\feedback\Loading.tsx
type nul > src\components\feedback\Empty.tsx
type nul > src\components\feedback\Error.tsx

:: Step 10 - Create Utility Files
:: Lib
type nul > src\lib\axios.ts
type nul > src\lib\query-client.ts

:: Constants
type nul > src\constants\routes.ts
type nul > src\constants\roles.ts
type nul > src\constants\api.ts

:: Types
type nul > src\types\api.ts
type nul > src\types\common.ts

:: Utils
type nul > src\utils\format-date.ts
type nul > src\utils\slug.ts
type nul > src\utils\reading-time.ts

echo Structure successfully created!
pause